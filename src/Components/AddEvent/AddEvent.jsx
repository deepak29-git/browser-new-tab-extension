import { useState } from "react";
import "../AddEvent/AddEvent.css";
import { EventModal } from "../EventModal/EventModal";
export const AddEvent = () => {
  const [event,setEvent]=useState(false)
  const addEventHandler = () => {
    if (event) {
      setEvent(false);
    } else {
      setEvent(!event);
    }
  };
  return (
    <div  className="event-container">
      {event && <EventModal />}
      <span
        onClick={() => addEventHandler()}
        data-hover="Add Event"
        className="event-title h3"
      >
        Add Event
        <div className="add-event-icon">
          <span className="material-icons-outlined">
            add_circle_outline
          </span>
        </div>
      </span>
    </div>
  );
};
