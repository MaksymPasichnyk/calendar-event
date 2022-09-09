import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import EventButton from "../eventButton/EventButton";
import styles from "./header.module.scss";
import { BsCalendarEvent } from "react-icons/bs";
import * as calendar from "../../utils/calendarHelper";
import SmallCalendar from "../smallCalendar/SmallCalendar";
import ActionDateBar from "../actionDateBar/ActionDateBar";
import EventModal from "../eventModal/EventModal";

const Header = () => {
  const {
    monthIndex,
    setMonthIndex,
    year,
    setYear,
    displaySmallCalendar,
    setDisplaySmallCalendar,
    setSelectedDay,
    setSmallCalendarDate,
		displayEventModal
  } = useContext(AppContext);
  const strDate = calendar.buildStrDate(monthIndex, year);

  const setNextMonth = () => {
    setMonthIndex((prevMonthIndex) => {
      if (prevMonthIndex + 1 > 11) {
        return 0;
      } else {
        return prevMonthIndex + 1;
      }
    });
    setYear((prevYear) => {
      if (monthIndex + 1 > 11) {
        return prevYear + 1;
      }
      return prevYear;
    });
  };

  const setPrevMonth = () => {
    setMonthIndex((prevMonthIndex) => {
      if (prevMonthIndex - 1 < 0) {
        return 11;
      } else {
        return prevMonthIndex - 1;
      }
    });
    setYear((prevYear) => {
      if (monthIndex - 1 < 0) {
        return prevYear - 1;
      }
      return prevYear;
    });
  };

  const toggleSmallCalendar = () => {
    setDisplaySmallCalendar((prevState) => !prevState);
    setSelectedDay({ date: calendar.date });
  };

  const handleClickTodayBtn = () => {
    setMonthIndex(calendar.date.getMonth());
    setYear(calendar.date.getFullYear());
    setSmallCalendarDate({
      month: calendar.date.getMonth(),
      year: calendar.date.getFullYear(),
    });
  };

  return (
    <header className={styles.root}>
      {displayEventModal && <EventModal />}
      <div className={styles.group}>
        <div className="flex">
          <EventButton />
          <button onClick={handleClickTodayBtn} className={styles.todayBtn}>
            today
          </button>
        </div>
        <div className={styles.container}>
          <ActionDateBar
            nextMonthHandler={setNextMonth}
            prevMonthHandler={setPrevMonth}
            strDate={strDate}
          />
          <button
            onClick={toggleSmallCalendar}
            className={styles.toggleCalendarBtn}
          >
            <BsCalendarEvent />
          </button>
        </div>
      </div>
      {displaySmallCalendar && <SmallCalendar />}
    </header>
  );
};

export default React.memo(Header);
