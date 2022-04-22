import { createContext, useContext, useState } from "react";

const EventContext=createContext(null)

const EventProvider=({children})=>{
    const [event,setEvent]=useState(false)
    const [createEvent,setCreateEvent]=useState(false)
    return <EventContext.Provider value={{event,setEvent,createEvent,setCreateEvent}}>{children}</EventContext.Provider>
}

const useEvent=()=>useContext(EventContext)

export {EventProvider,useEvent}