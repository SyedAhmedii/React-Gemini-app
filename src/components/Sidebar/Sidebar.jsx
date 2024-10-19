import React, { useContext, useState } from 'react';
import './Sidebar.css';
import { assets } from '../../assets/assets';
import { Context } from '../../context/Context';

const Sidebar = () => {
  const [extended, setExtended] = useState(false); // Sidebar collapse state
  const { prevPrompts, onSent, startNewChat } = useContext(Context);

  const handlePromptClick = (prompt) => {
    onSent(prompt);  
  };

  return (
    <div className={`sidebar ${extended ? 'sidebar-extended' : 'sidebar-collapsed'}`}>
      <div className="top">
        <img
          onClick={() => setExtended(!extended)}
          className='menu'
          src={assets.menu_icon}
          alt="Menu Icon"
        />
        <div className="new-chat" onClick={startNewChat}>
          <img src={assets.plus_icon} alt="Plus Icon" />
          {extended ? <p>New Chat</p> : null} {/* Only show text if extended */}
        </div>
        
        {extended && (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {prevPrompts.map((item, index) => (
              <div key={index} className="recent-entry" onClick={() => handlePromptClick(item)}>
                <img src={assets.message_icon} alt="Message Icon" />
                <p>{item.length > 20 ? `${item.slice(0, 20)}...` : item}</p> {/* Truncate long text */}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="Question Icon" />
          {extended ? <p>Help</p> : null} {/* Show text only if extended */}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="History Icon" />
          {extended ? <p>Activity</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt="Settings Icon" />
          {extended ? <p>Settings</p> : null}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
