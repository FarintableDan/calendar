import * as types from "./constants";

export const addEvent = (keyDate, fullDate) => ({
  type: types.ADD_EVENT,
  payload: { keyDate, fullDate },
});

export const removeEvent = (keyDate, id) => ({
  type: types.REMOVE_EVENT,
  payload: { keyDate, id },
});

export const editEvent = (keyDate, data, id) => ({
  type: types.EDIT_EVENT,
  payload: { keyDate, data, id },
});

export const removeFromNotificationQue = (id) => ({
  type: types.REMOVE_FROM_NOTIFICATION_QUE,
  payload: { id },
});
