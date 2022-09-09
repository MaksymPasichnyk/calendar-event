export const date = new Date();
export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export const fullWeekDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
export const shortWeekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export const buildStrDate = (month, year) => {
  return `${months[month]} ${year}`;
};

export const getfirstDay = (year, month) => {
  return new Date(year, month).getDay();
};

//export const daysInMonth = (month, year) => {
//  return 32 - new Date(year, month, 32).getDate();
//};

const generateDate = (year, month, day) => {
	const [hour, minute] = new Date().toLocaleTimeString(undefined, {
	hour: "numeric",
	minute: "numeric"
}).split(":");

  return new Date(year, month, day, hour, minute);
};

export const getCurrentTime = () => {
  return new Date().toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "numeric",
  });
};

export const buildCalendar = (month, year) => {
  const daysInMonth = 32 - new Date(year, month, 32).getDate();
  const firstDay = getfirstDay(year, month) === 0 ? 7 : getfirstDay(year,month);
  const monthArr = [];
  let day = 1;
  let startDayOfNextMonth = 1;
  const firstDayOfMonth = new Date(year, month);
  const dateString = firstDayOfMonth.toLocaleDateString("en-us", {
    weekday: "long",
  });
  const daysBeforeCurMonth = fullWeekDays.indexOf(dateString.split(",")[0]);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  let lastWeekday = lastDayOfMonth.toLocaleDateString("en-us", {
    weekday: "long",
  });
  const daysAfterCurMonth = 6 - fullWeekDays.indexOf(lastWeekday);
	const amountOfCalCells = daysAfterCurMonth + daysInMonth + daysBeforeCurMonth;

  for (let i = 1; i <= amountOfCalCells; i++) {
    if (i < firstDay) {
      const prevMonthDay = lastDayOfMonth.getDate() - (firstDay - i);
      monthArr.push({
        currentMonth: false,
        date: generateDate(year, month - 1, prevMonthDay),
      });
    } else if (day > daysInMonth) {
      const nextMonthDay = startDayOfNextMonth;
      monthArr.push({
        currentMonth: false,
        date: generateDate(year, month + 1, nextMonthDay),
      });
      startDayOfNextMonth++;
    } else {
      monthArr.push({
        currentMonth: true,
        date: generateDate(year, month, day),
      });
      day++;
    }
  }

  return monthArr;
};