import dayjs from "dayjs";

export const parseDate = (date) => {
  return date.toLocaleDateString("en-EN").replaceAll("/", "-");
};

export const toFormat = (date, format) => dayjs(date).format(format);

export const getSelectedDate = (firstDate, secondDate) =>
  dayjs(
    `${toFormat(firstDate, "YYYY-MM-DD") + toFormat(secondDate, "HH:mm:ss")}`,
  );

export const getShortData = (date) => toFormat(date, "MM-DD-YYYY");

export const getTimeDiff = (from, to, format = "seconds") =>
  to.diff(from, format);

export const isPast = (date) => date.diff(dayjs(), "seconds") <= 0;
