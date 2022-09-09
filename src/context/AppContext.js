import { createContext, useState, useReducer, useEffect } from "react";
import * as calendar from "../utils/calendarHelper";

export const AppContext = createContext({});

function savedEventsReducer(state, { type, payload }) {
  switch (type) {
    case "push":
      return [...state, payload];
    case "update":
      return state.map((evt) => (evt.id === payload.id ? payload : evt));
    case "delete":
      return state.filter((evt) => evt.id !== payload.id);
    default:
      throw new Error();
  }
}

function initEvents() {
  const storageEvents = localStorage.getItem("savedEvents");
  const parsedEvents = storageEvents ? JSON.parse(storageEvents) : [];
  return parsedEvents;
}

export const AppContextProvider = ({ children }) => {
  const [monthIndex, setMonthIndex] = useState(calendar.date.getMonth());
  const [year, setYear] = useState(calendar.date.getFullYear());
  const [selectedDay, setSelectedDay] = useState({date: new Date()});
  const [displayEventModal, setDisplayEventModal] = useState(false);
  const [savedEvents, dispatchEvent] = useReducer(
    savedEventsReducer,
    [],
    initEvents
  );
	const [selectedEvent, setSelectedEvent] = useState(null);
	const [displaySmallCalendar, setDisplaySmallCalendar] = useState(false);
	useEffect(() => {
		localStorage.setItem("savedEvents", JSON.stringify(savedEvents));
	}, [savedEvents])
	const [smallCalendarDate, setSmallCalendarDate] = useState({
		month: calendar.date.getMonth(),
		year: calendar.date.getFullYear()
	})

  return (
    <AppContext.Provider
      value={{
        monthIndex,
        setMonthIndex,
        year,
        setYear,
        selectedDay,
        setSelectedDay,
        displayEventModal,
        setDisplayEventModal,
				savedEvents,
				dispatchEvent,
				displaySmallCalendar,
				setDisplaySmallCalendar,
				selectedEvent,
				setSelectedEvent,
				smallCalendarDate,
				setSmallCalendarDate
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
