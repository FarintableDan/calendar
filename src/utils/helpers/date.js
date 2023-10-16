import dayjs from "dayjs";

export const parseDate = (date) => {
  return date.toLocaleDateString("en-EN").replaceAll("/", "-");
};

export const getSelectedDate = (firstDate, secondDate) => {
  const dateFromUrl = dayjs(firstDate);
  const yearFromUrl = dateFromUrl.year();
  const dayFromUrl = dateFromUrl.$D;
  const monthFromUrl = dateFromUrl.month() + 1;
  return dayjs(
    `${
      yearFromUrl +
      "-" +
      monthFromUrl +
      "-" +
      dayFromUrl +
      " " +
      secondDate.hour() +
      ":" +
      secondDate.minute() +
      ":" +
      secondDate.second()
    }`,
  );
};

export const toFormat = (date, format) => dayjs(date).format(format);

export const getShortData = (date) => {
  const yearFromUrl = date.$y;
  const dayFromUrl = date.$D;
  const monthFromUrl = date.month() + 1;
  return `${monthFromUrl + "-" + dayFromUrl + "-" + yearFromUrl}`;
};

export const timeToGetNotification = (date) => {
  const secondsInHour = 3600;
  const minutesInHour = 60;
  if (!date) return null;
  return date.$H * secondsInHour + date.$m * minutesInHour + date.$s;
};
