import React, { useContext, useRef } from 'react';
import './Main.css';
import { assets } from '../../assets/assets';
import { Context } from '../../context/Context';

const Main = () => {
    const {
        onSent,
        recentPrompt,
        showResult,
        loading,
        resultData,
        setInput,
        input
    } = useContext(Context);


    const fileInputRef = useRef(null);

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && input) {
            onSent(input);
        }
    };

    const handleCardClick = (text) => {
        setInput(text);
        onSent(text);
    };


    const openFilePicker = () => {
        fileInputRef.current.click();
    };


    const handleMicClick = () => {
        alert("Ye Feature baad mai ayega");
    };

    return (
        <div className='main'>
            <div className="nav">
                <p>Gemini</p>
                <img src={assets.user_icon} alt="" />
            </div>
            <div className="main-container">

                {!showResult
                ? <>
                    <div className="greet">
                        <p><span>Hello, Syed</span></p>
                        <p>How can I help you today?</p>
                    </div>
                    <div className="cards">
                        <div className="card" onClick={() => handleCardClick('How many best places of Pakistan for tourist')}>
                            <p>How many best places of Pakistan for tourist</p>
                            <img src={assets.compass_icon} alt="" />
                        </div>
                        <div className="card" onClick={() => handleCardClick('Teach me to make homemade ice cream')}>
                            <p>Teach me to make homemade ice cream</p>
                            <img src={assets.bulb_icon} alt="" />
                        </div>
                        <div className="card" onClick={() => handleCardClick('Explain how atoms and molecules interact')}>
                            <p>Explain how atoms and molecules interact</p>
                            <img src={assets.message_icon} alt="" />
                        </div>
                        <div className="card" onClick={() => handleCardClick('Design a custom CSS file for HTML')}>
                            <p>Design a custom CSS file for HTML</p>
                            <img src={assets.code_icon} alt="" />
                        </div>
                    </div>
                </>
                : <div className='result'>
                    <div className="result-title">
                        <img src={assets.user_icon} alt="" />
                        <p>{recentPrompt}</p>
                    </div>
                    <div className="result-data">
                        <img src={assets.gemini_icon} alt="" />
                        {loading
                        ? <div className='loader'>
                            <hr />
                            <hr />
                            <hr />
                          </div>
                        : <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
                        }
                    </div>
                </div>
                }

                <div className="main-bottom">
                    <div className="search-box">
                        <input
                            type="text"
                            placeholder='Enter a prompt here'
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                        />
                        <div>
                            <img src={assets.gallery_icon} alt="Gallery" onClick={openFilePicker} />
                            <input
                                type="file"
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                                onChange={(e) => console.log(e.target.files)}
                            />
                            <img 
                                src={assets.mic_icon} 
                                alt="Microphone" 
                                onClick={handleMicClick} 
                                style={{ cursor: "pointer" }} 
                            />
                            {input && (
                                <img
                                    src={assets.send_icon}
                                    alt="Send"
                                    onClick={() => onSent(input)}
                                    style={{ cursor: "pointer" }}
                                />
                            )}
                        </div>
                    </div>
                    <p className="bottom-info">
                        Gemini may display inaccurate info, including about people, so double-check its responses.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Main;

