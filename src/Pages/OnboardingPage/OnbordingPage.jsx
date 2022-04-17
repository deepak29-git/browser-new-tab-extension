import { useState } from "react";
import "../OnboardingPage/OnboardingPage.css";
import nextIcon from "../../assets/next.png";
import { getMinuteBelowTen, greetings } from "../index";

export const OnboardingPage = () => {
  const [userName, setUserName] = useState("");
  const [continueBtn, setContinueBtn] = useState(true);
  const [mainFocusInput, setMainFocusInput] = useState("");
  const [printMainFocus, setPrintMainFocus] = useState("");
  const [hideMainFocusInput, setHideMainFocusInput] = useState(true);

  const continueHandler = (e) => {
    if (e.key === "Enter") {
      setContinueBtn(false);
    }
    if (e.target.innerText === "Continue") {
      setContinueBtn(false);
    }
  };

  const addMainFocusHandler = (e) => {
    if (e.key === "Enter") {
      setPrintMainFocus(mainFocusInput);
      setHideMainFocusInput(false);
    }
  };

  return (
    <>
      {continueBtn ? (
        <div className="center-align">
          <h1 className="title">Hello,what's your name?</h1>
          <input
            onChange={(e) => setUserName(e.target.value)}
            className="name-input"
            onKeyDown={(e) => continueHandler(e)}
            type="text"
          />
          <button
            onClick={(e) => continueHandler(e)}
            className="btn text-icon continue-btn"
          >
            Continue
            <img className="icon" src={nextIcon} alt="icon" />
          </button>
        </div>
      ) : (
        <div className="center-align">
          <h1 className="title">{`${new Date().getHours()}:${getMinuteBelowTen()}`}</h1>
          <p className="h1 greeting-text">
            {greetings()}, {userName}.
          </p>
          <p className="h2 main-focus-title mt-1">{printMainFocus}</p>
          {hideMainFocusInput && (
            <div>
              <p className="h3 main-focus-title center-text mt-1">
                What is your main focus for today?
              </p>

              <input
                onChange={(e) => setMainFocusInput(e.target.value)}
                className="name-input"
                onKeyDown={addMainFocusHandler}
                value={mainFocusInput}
                type="text"
              />
            </div>
          )}
        </div>
      )}
    </>
  );
};
