import { createContext, useState } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const startNewChat = () => {
    setInput("");
    setResultData("");
    setShowResult(false);
    setRecentPrompt("");
  };

  const delayPara = (index, nextWord) => {
    setTimeout(() => {
      setResultData(prev => prev + nextWord);
    }, 15 * index);
  };

  const onSent = async (prompt) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);

    let query = prompt || input;

    if (!prevPrompts.includes(query)) {
      setPrevPrompts(prev => [...prev, query]);
    }

    try {
      const response = await run(query);
      setRecentPrompt(query);

      let formattedResponse = response
        .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>")  
        .replace(/^\*\s(.*?)(?=\n|$)/gm, "<li>$1</li>")  
        .replace(/\n/g, "<br>"); 

      formattedResponse = "<ul>" + formattedResponse + "</ul>";
      formattedResponse = formattedResponse.replace(/<\/li>\s*<li>/g, "</li><li>");

      let wordsArray = formattedResponse.split(/(<[^>]+>)/g);
      wordsArray.forEach((word, index) => {
        delayPara(index, word);
      });

    } catch (error) {
      console.error("Error in processing the response:", error);
    } finally {
      setLoading(false);
      setInput("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onSent();
    }
  };

  const contextValue = {
    prevPrompts,
    setPrevPrompts,
    onSent,
    startNewChat,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    handleKeyPress, 
  };

  return (
    <Context.Provider value={contextValue}>
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;
