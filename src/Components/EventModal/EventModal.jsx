import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import "../EventModal/EventModal.css";
export const EventModal = () => {
  const [createEvent, setCreateEvent] = useState(false);
  const [interval, setInterval] = useState("");
  const [eventData, setEventData] = useState({
    eventName: "",
    eventDate: "",
    eventTime: "",
  });
  const [printEvent, setPrintEvent] = useState(
    localStorage.getItem("countdown")
      ? JSON.parse(localStorage.getItem("countdown"))
      : []
  );
  const [countDown, setCountDown] = useState();
  const [showDelete, setShowDelete] = useState(false);
  const addEventHandler = () => {
    setCreateEvent(true);
  };

  const createEventHandler = (e) => {
    e.preventDefault();
    setPrintEvent((previousEvent) => [
      ...previousEvent,
      {
        ...eventData,
        id: uuid(),
      },
    ]);

    setEventData({ eventName: "", eventDate: "", eventTime: "" });
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  const getCountDown = (eventDate, eventTime) => {
    const countDownDate = new Date(`${eventDate},${eventTime}`).getTime();

    const currentTime = new Date().getTime();
    const timeLeft = countDownDate - currentTime;

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));

    if (timeLeft < 0) {
      clearInterval(interval);
      return "Event is happening";
    } else {
      return `${days}d ${hours}h ${minutes}m`;
    }
  };

  const deleteEventHandler = (id) => {
    const deleteEvent = printEvent.filter((event) => event.id !== id);
    setPrintEvent(deleteEvent);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown(new Date());
      setInterval(interval);
    }, 1000);
  }, [countDown]);

  useEffect(() => {
    localStorage.setItem("countdown", JSON.stringify(printEvent));
  }, [printEvent]);

  return (
    <>
      {!createEvent ? (
        <div className="event-modal">
          <div className="countdown-container">
            <span className="material-icons-outlined">event</span>
            <p>Countdowns</p>
            <div className="create-more-container">
              <span
                onClick={() => addEventHandler()}
                className="material-icons-outlined"
              >
                add
              </span>
              <span
                onClick={() =>
                  showDelete ? setShowDelete(false) : setShowDelete(!showDelete)
                }
                className="material-icons-outlined"
              >
                more_horiz
              </span>
            </div>
          </div>
          {showDelete ? (
            <div className="delete-btn-container">
              <button
                onClick={() => {
                  setPrintEvent([]);
                  setShowDelete(false);
                }}
                className="delete-all-btn btn"
              >
                Delete All
              </button>
            </div>
          ) : (
            ""
          )}
          <div className="print-countdown-container">
            {printEvent.map(({ id, eventName, eventDate, eventTime }) => {
              let countDown = getCountDown(eventDate, eventTime);
              return (
                <div key={id} className="show-countdown">
                  <div className="event-details">
                    <p>{eventName}</p>
                    <p>{countDown}</p>
                    <p>{eventDate}</p>
                    <p>{eventTime}</p>
                  </div>
                  <span
                    onClick={() => deleteEventHandler(id)}
                    className="material-icons-outlined"
                  >
                    delete
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="event-modal add-event-modal">
          <span
            onClick={() => setCreateEvent(false)}
            className="material-icons-outlined back-icon"
          >
            arrow_back
          </span>
          <form action="" className="form-container">
            <div>
              <label className="label" htmlFor="name">
                NAME
              </label>
            </div>
            <input
              className="event-input"
              placeholder="Enter Event"
              id="name"
              type="text"
              onChange={(e) => onChangeHandler(e)}
              value={eventData.eventName}
              name="eventName"
            />
            <div>
              <label className="label" htmlFor="date">
                Date
              </label>
            </div>
            <input
              className="event-input"
              id="date"
              type="date"
              onChange={(e) => onChangeHandler(e)}
              value={eventData.eventDate}
              name="eventDate"
            />
            <div>
              <label className="label" htmlFor="time">
                TIME
              </label>
            </div>
            <input
              className="event-input"
              id="time"
              type="time"
              onChange={(e) => onChangeHandler(e)}
              value={eventData.eventTime}
              name="eventTime"
            />
            <button
              disabled={
                eventData.eventName &&
                eventData.eventDate &&
                eventData.eventTime
                  ? false
                  : true
              }
              onClick={(e) => createEventHandler(e)}
              className="btn create-btn"
            >
              Create
            </button>
          </form>
        </div>
      )}
    </>
  );
};
