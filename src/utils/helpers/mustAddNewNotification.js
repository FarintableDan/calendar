import { getTimeDiff, isPast } from "./date";

export const mustAddNewNotification = (dateFrom, dateTo) =>
  getTimeDiff(dateFrom, dateTo) > 0 && !isPast(dateFrom);
