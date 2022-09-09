import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import styles from "./smallCalendar.module.scss";
import * as calendar from "../../utils/calendarHelper";
import { nanoid } from "nanoid";
import ActionDateBar from "../actionDateBar/ActionDateBar";

const SmallCalendar = () => {
  const {
    setSelectedDay,
    selectedDay,
    smallCalendarDate,
    setSmallCalendarDate,
  } = useContext(AppContext);
  const { month: currentMonth, year: currentYear } = smallCalendarDate;

  const month = calendar.buildCalendar(currentMonth, currentYear);

  const defineCurrentDay = (date) => {
    return calendar.date.getDate() === date.getDate() &&
      calendar.date.getFullYear() === date.getFullYear() &&
      calendar.date.getMonth() === date.getMonth()
      ? `${styles.currentDay}`
      : "";
  };

  const defineSelectedDay = (selectedDay, day) => {
    return selectedDay.date.getDate() === day.date.getDate() &&
      selectedDay.date.getFullYear() === day.date.getFullYear() &&
      selectedDay.date.getMonth() === day.date.getMonth()
      ? `${styles.selectedDay}`
      : "";
  };

  const handleClickOnDay = (day) => {
    if (day.currentMonth) {
      setSelectedDay(day);
    }
  };

  const strDate = calendar.buildStrDate(currentMonth, currentYear);

  const setNextMonth = () => {
    setSmallCalendarDate((prevSmallCalendarDate) => {
      if (prevSmallCalendarDate.month + 1 > 11) {
        return {
          ...prevSmallCalendarDate,
          month: 0,
        };
      }
      return {
        ...prevSmallCalendarDate,
        month: prevSmallCalendarDate.month + 1,
      };
    });
    setSmallCalendarDate((prevSmallCalendarDate) => {
      if (currentMonth + 1 > 11) {
        return {
          ...prevSmallCalendarDate,
          year: prevSmallCalendarDate.year + 1,
        };
      }
      return prevSmallCalendarDate;
    });
  };

  const setPrevMonth = () => {
    setSmallCalendarDate((prevSmallCalendarDate) => {
      if (prevSmallCalendarDate.month - 1 < 0) {
        return {
          ...prevSmallCalendarDate,
          month: 11,
        };
      }
      return {
        ...prevSmallCalendarDate,
        month: prevSmallCalendarDate.month - 1,
      };
    });
    setSmallCalendarDate((prevSmallCalendarDate) => {
      if (currentMonth - 1 < 0) {
        return {
          ...prevSmallCalendarDate,
          year: prevSmallCalendarDate.year + 1,
        };
      }
      return prevSmallCalendarDate;
    });
  };

  const daysElems = month.map((day) => {
    const calendarDayClasses = `${styles.day}
					 ${day.currentMonth ? "" : styles.blurDay}
					 ${defineCurrentDay(day.date)}
					 ${defineSelectedDay(selectedDay, day)}
					 `;

    return (
      <div
        key={nanoid()}
        className={calendarDayClasses}
        onClick={() => {
          handleClickOnDay(day);
        }}
      >
        <span>{day.date.getDate()}</span>
      </div>
    );
  });

  return (
    <div className={styles.smallCalendar}>
      <header className={styles.header}>
        <ActionDateBar
          prevMonthHandler={setPrevMonth}
          nextMonthHandler={setNextMonth}
          strDate={strDate}
        />
      </header>
      <div className={styles.calendarHead}>
        {calendar.shortWeekDays.map((day) => {
          return (
            <div className={styles.dayTitle} key={nanoid()}>
              {day}
            </div>
          );
        })}
      </div>
      <div className={styles.month}>{daysElems}</div>
    </div>
  );
};

export default SmallCalendar;
