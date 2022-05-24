import { useEffect, useState } from "react";
import "../OnboardingPage/OnboardingPage.css";
import nextIcon from "../../assets/next.png";
import { getMinuteBelowTen, greetings } from "../index";
import { Todo } from "../../Components/Todo/Todo";
import { Weather } from "../../Components/Weather/Weather";
import { getQuoteApi } from "../../api-services/quotes-api";
import { AddEvent } from "../../Components/AddEvent/AddEvent";
import { Setting } from "../../Components/Setting/Setting";
// import {Link} from 'react-router-dom'
export const OnboardingPage = () => {
  const [userName, setUserName] = useState("");
  const [mainFocusInput, setMainFocusInput] = useState("");
  const [clock, setClock] = useState();
  const [doneMainFocus, setDoneMainFocus] = useState(
    localStorage.getItem("isDoneMainFocus") === "true" ? true : false
  );
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

  const lineThroughHandler = () => {
    if (doneMainFocus) {
      setDoneMainFocus(false);
      localStorage.setItem("isDoneMainFocus", false);
    } else {
      setDoneMainFocus(!doneMainFocus);
      localStorage.setItem("isDoneMainFocus", !doneMainFocus);
    }
  };

  const addMainFocusHandler = (e) => {
    if (e.key === "Enter") {
      setPrintMainFocus(mainFocusInput);
    }
  };

  const editClickHandler = () => {
    setPrintMainFocus("");
  };

  useEffect(() => {
    setInterval(() => {
      setClock(new Date().getHours() + ":" + getMinuteBelowTen());
    }, 1000);
  }, [clock]);

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
      <div  className="link-container">
        <a
          className="link-btn btn"
            target="_blank"
            rel="noreferrer"
            href="https://addons.mozilla.org/en-US/firefox/addon/tab-tools/"
          >
            Download Extension
          <span class="material-icons">download</span>
          </a>
          </div>
      {!printUserName ? (
        <div className="center-align">
          <h1 className="title">Hello,what's your name?</h1>
          <input
            onChange={(e) => setUserName(e.target.value)}
            className="name-input"
            onKeyDown={(e) => continueHandler(e)}
            type="text"
            autoFocus
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
          <h1 className="title">{clock}</h1>
          <p className="h1 greeting-text">
            {greetings()}, {printUserName}.
          </p>

          {printMainFocus && (
            <div className="main-focus-container">
              <input
                onClick={() => lineThroughHandler()}
                className="mainfocus-checkbox"
                type="checkbox"
                checked={doneMainFocus ? true : false}
              />
              <label
                className={
                  doneMainFocus ? "done-mainfocus" : "main-focus-title"
                }
              >
                {printMainFocus}
              </label>
              <span
                onClick={() => editClickHandler()}
                className="material-icons-outlined edit-icon-mainfocus"
              >
                edit
              </span>
            </div>
          )}
          {doneMainFocus && printMainFocus ? (
            <span className="done-msg">Good job</span>
          ) : (
            ""
          )}

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
                autoFocus
              />
            </div>
          )}
        </div>
      )}
      {printUserName && (
        <div className="quotes-container">
          <p className="quotes">{quotes.content}</p>
        </div>
      )}
      {printUserName && <Todo />}
      {printUserName && <Weather />}
      {printUserName && <AddEvent />}
      {printUserName && (
        <Setting userName={setPrintUserName} mainFocus={setPrintMainFocus} />
      )}
    </>
  );
};
