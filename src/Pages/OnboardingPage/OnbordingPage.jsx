import { useEffect, useState } from "react";
import "../OnboardingPage/OnboardingPage.css";
import nextIcon from "../../assets/next.png";
import { getMinuteBelowTen, greetings } from "../index";
import { Todo } from "../../Components/Todo/Todo";
import { Weather } from "../../Components/Weather/Weather";
import { getQuoteApi } from "../../api-services/quotes-api";
import { AddEvent } from "../../Components/AddEvent/AddEvent";
import { Setting } from "../../Components/Setting/Setting";

export const OnboardingPage = () => {
  const [userName, setUserName] = useState("");
  const [mainFocusInput, setMainFocusInput] = useState("");
  const [printMainFocus, setPrintMainFocus] = useState(
    localStorage.getItem("mainFocus") ? localStorage.getItem("mainFocus") : ""
  );
  const [quotes, setQuotes] = useState([]);
  const [printUserName, setPrintUserName] = useState(
    localStorage.getItem("userName") ? localStorage.getItem("userName") : ""
  );

  const continueHandler = (e) => {
    if (e.key === "Enter") {
      setPrintUserName(userName);
    }
    if (e.target.innerText === "Continue") {
      setPrintUserName(userName);
    }
  };

  const addMainFocusHandler = (e) => {
    if (e.key === "Enter") {
      setPrintMainFocus(mainFocusInput);
    }
  };

  const editClickHandler = () => {
    setPrintMainFocus("")
  };
 

  useEffect(() => {
    localStorage.setItem("userName", printUserName);
  }, [printUserName]);

  useEffect(() => {
    localStorage.setItem("mainFocus", printMainFocus);
  }, [printMainFocus]);

  useEffect(() => {
    getQuoteApi(setQuotes);
  }, []);

  return (
    <>
      {!printUserName ? (
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
          <h1 className="title">{new Date().getHours()<10?"0"+new Date().getHours():new Date().getHours()}:{getMinuteBelowTen()}</h1>
          <p className="h1 greeting-text">
            {greetings()}, {printUserName}.
          </p>
          <p className="h2 main-focus-title mt-1">{printMainFocus}</p>
          {!printMainFocus && (
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
          <div className="edit-delete-container">
            <span
              onClick={() => editClickHandler()}
              className="edit-icon material-icons-outlined"
            >
              edit
            </span>
           
          </div>
        </div>

      )}
          <div className="quotes-container">
            <p className="quotes">{quotes.content}</p>
          </div>
      {printUserName && <Todo />}
      {printUserName && <Weather />}
      {printUserName && <AddEvent />}
      {printUserName && <Setting />}
    </>
  );
};
