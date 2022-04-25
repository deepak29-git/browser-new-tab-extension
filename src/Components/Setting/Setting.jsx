import { useState } from "react";
import "../Setting/Setting.css";
export const Setting = () => {
  const [setting, setSetting] = useState(false);
  const addsettingHandler = () => {
    if (setting) {
      setSetting(false);
    } else {
      setSetting(!setting);
    }
  };
  const yesHandler = () => {
    localStorage.clear();
    setSetting(false);
  };

  const noHandler = () => {
    setSetting(false);
  };
  return (
    <div className="setting-container">
      {setting && (
        <div className="setting-modal">
          <div>
            <p className="setting-text">Do you want to reset all setting?</p>
            <button className="btn yes-btn" onClick={() => yesHandler()}>
              Yes
            </button>
            <button className="btn no-btn" onClick={() => noHandler()}>
              No
            </button>
          </div>
        </div>
      )}
      <span
        onClick={() => addsettingHandler()}
        data-hover="settings"
        className="setting-title h3"
      >
        Setting
        <div className="add-setting-icon">
          <span className="material-icons-outlined">settings</span>
        </div>
      </span>
    </div>
  );
};
