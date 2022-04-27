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
  const [doneMainFocus,setDoneMainFocus]=useState(false)
  const [printMainFocus, setPrintMainFocus] = useState(
    localStorage.getItem("mainFocus") ? localStorage.getItem("mainFocus") : ""
  );
  const [quotes, setQuotes] = useState([]);
  const [printUserName, setPrintUserName] = useState(
    localStorage.getItem("userName") ? localStorage.getItem("userName") : ""
  );



  const timeFormat=()=>{
    const hours=new Date().getHours()
    if(hours>=12){
      return `0${hours-12}:${getMinuteBelowTen()} PM`
    }else{
      return `0${hours}:${getMinuteBelowTen()} AM`
    }
  }
 
  const continueHandler = (e) => {
    if (e.key === "Enter") {
      setPrintUserName(userName);
    }
    if (e.target.innerText === "Continue") {
      setPrintUserName(userName);
    }
  };

  const lineThroughHandler=()=>{
    if(doneMainFocus){
      setDoneMainFocus(false)
    }else {
      setDoneMainFocus(!doneMainFocus)
    }
  }

  const addMainFocusHandler = (e) => {
    if (e.key === "Enter") {
      setPrintMainFocus(mainFocusInput);
    }
  };

  const editClickHandler = () => {
    setPrintMainFocus("");

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
          <h1 className="title">
            {new Date().getHours() < 10
              ? "0" + timeFormat()
              : timeFormat()}
          </h1>
          <p className="h1 greeting-text">
            {greetings()}, {printUserName}.
          </p>

          {printMainFocus&&<div className="main-focus-container">
            <input onClick={()=>lineThroughHandler()} id="done-mainfocus" className="mainfocus-checkbox" type="checkbox" />
            <label className={doneMainFocus? "done-mainfocus":"main-focus-title"}   htmlFor="done-mainfocus" >{printMainFocus}</label>
           <span
              onClick={() => editClickHandler()}
              className="material-icons-outlined edit-icon-mainfocus"
            >
              edit
            </span>
          </div>}
       {doneMainFocus && printMainFocus?<span className="done-msg">Good job</span>:""}

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
        </div>
      )}
      {printUserName&&<div className="quotes-container">
        <p className="quotes">{quotes.content}</p>
      </div>}
      {printUserName && <Todo />}
      {printUserName && <Weather />}
      {printUserName && <AddEvent />}
      {printUserName && (
        <Setting userName={setPrintUserName} mainFocus={setPrintMainFocus} />
      )}
    </>
  );
};
