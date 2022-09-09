import React, { useContext } from "react";
import styles from "./calendar.module.scss";
import { AppContext } from "../../context/AppContext";
import { nanoid } from "nanoid";
import * as calendar from "../../utils/calendarHelper";


const Calendar = () => {
  const {
    year,
    monthIndex,
    setDisplayEventModal,
    setSelectedDay,
    savedEvents,
		setSelectedEvent
  } = useContext(AppContext);
  const defineCurrentDay = (date) => {
    return calendar.date.getDate() === date.getDate() &&
      calendar.date.getFullYear() === date.getFullYear() &&
      calendar.date.getMonth() === date.getMonth()
      ? `${styles.currentDay}`
      : "";
  };

  const month = calendar.buildCalendar(monthIndex, year);

  const handleClickOnDay = (day) => {
    if (day.currentMonth) {
      setDisplayEventModal(true);
      setSelectedDay(day);
    }
  };

	const handleClickOnEvent = (event) => {
		setSelectedEvent(event)
	}

  const daysElems = month.map((day) => {
    const calendarDayClasses = `${styles.calendarDay}
					 ${day.currentMonth ? "" : styles.blurDay}
					 ${defineCurrentDay(day.date)}
					`;
    const savedEventsElems = savedEvents.map((event) => {
      if (
        day.date.toLocaleDateString(undefined, {
          dateStyle: "short",
        }) ===
        new Date(event.date).toLocaleDateString(undefined, {
          dateStyle: "short",
        })
      ) {
        return <span 
					key={nanoid()} 
					className={styles.eventBadge}
					onClick={() => {handleClickOnEvent(event)}}
				>{event.title}</span>;
      }
    });

    return (
      <div
        key={nanoid()}
        className={calendarDayClasses}
        onClick={() => {
          handleClickOnDay(day);
        }}
      >
        <span>{day.date.getDate()}</span>
        <div className={styles.eventList}>{savedEventsElems}</div>
      </div>
    );
  });

  return (
    <div className={styles.calendar}>
      <div className={styles.calendarHead}>
        {calendar.fullWeekDays.map((day) => {
          return (
            <div className={styles.dayTitle} key={nanoid()}>
              {day}
            </div>
          );
        })}
      </div>
      <div className={styles.calendarMonth}>{daysElems}</div>
    </div>
  );
};

export default React.memo(Calendar);
