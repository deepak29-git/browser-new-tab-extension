import { useState } from "react";
import "../OnboardingPage/OnboardingPage.css";
import nextIcon from "../../assets/next.png";
import { getMinuteBelowTen, greetings } from "../index";

export const OnboardingPage = () => {
  const [nameInput, setNameInput] = useState("");
  const [mainFocusInput, setMainFocusInput] = useState("");
  const [mainFocus, setMainFocus] = useState("");
  const [show, setShow] = useState(false);
  const [hideMainFocusOutput, setHideMainFocusOutput] = useState(false);
  const [hideInput, setHideInput] = useState(true);
  const [hideMainFocusTitle, setHideMainFocusTitle] = useState(false);

  const continueHandler = () => {
    setShow(true);
    setHideMainFocusTitle(true);
    setMainFocusInput("");
  };

  const addMainFocusHandler = (e) => {
    if (e.key === "Enter") {
      setMainFocus(mainFocusInput);
      setHideMainFocusTitle(false);
      setHideMainFocusOutput(true);
      setHideInput(false);
    }
  };

  return (
    <div className="center-align">
      {!show ? (
        <h1 className="title">Hello,what's your name?</h1>
      ) : (
        <h1 className="title">{`${new Date().getHours()}:${getMinuteBelowTen()}`}</h1>
      )}
      {show && (
        <p className="h1 greeting-text">
          {greetings()}, {nameInput}.
        </p>
      )}
      {hideMainFocusTitle && (
        <p className="h3 main-focus-title mt-1">
          What is your main focus for today?
        </p>
      )}
      {hideMainFocusOutput && (
        <p className="h3 main-focus-title mt-1">{mainFocus}</p>
      )}
      {!show ? (
        <input
          onChange={(e) => setNameInput(e.target.value)}
          className="name-input"
          type="text"
        />
      ) : (
        hideInput && (
          <input
            onChange={(e) => setMainFocusInput(e.target.value)}
            className="name-input"
            onKeyDown={addMainFocusHandler}
            value={mainFocusInput}
            type="text"
          />
        )
      )}

      {!show && (
        <button
          onClick={() => continueHandler()}
          className="btn text-icon continue-btn"
        >
          Continue
          <img className="icon" src={nextIcon} alt="icon" />
        </button>
      )}
    </div>
  );
};
