import dayjs from "dayjs";

import * as types from "./constants";
import { timeToGetNotification } from "../utils/helpers/date";
import { spreadAll } from "../utils/helpers/spreadAll";

const initialState = {
  counter: 1,
  eventList: {},
  notificationQue: [],
};

export default function mainReducer(state = initialState, { type, payload }) {
  const currentEventList = state.eventList;
  const counter = state.counter;
  const keyDatePayload = payload?.keyDate;
  const currentDate = currentEventList?.[keyDatePayload] || [];
  switch (type) {
    case types.ADD_EVENT: {
      return {
        ...state,
        eventList: {
          ...currentEventList,
          [keyDatePayload]: [
            ...currentDate,
            { ...payload.fullDate, id: counter },
          ],
        },
        notificationQue: [
          ...spreadAll(Object.values(currentDate)),
          { ...payload.fullDate, id: counter },
        ]
          .filter((i) => timeToGetNotification(i.from) - timeToGetNotification(dayjs()) > 0)
          .sort((a, b) => a - b),
        counter: counter + 1,
      };
    }
    case types.REMOVE_FROM_NOTIFICATION_QUE: {
      return {
        ...state,
        notificationQue: state.notificationQue.filter(
          (notification) => notification.id !== payload.id,
        ),
      };
    }
    case types.REMOVE_EVENT: {
      const newEventList = currentEventList[keyDatePayload].filter(
        (date) => date.id !== payload.id,
      );
      return {
        ...state,
        eventList: {
          ...currentEventList,
          [keyDatePayload]: [...newEventList],
        },
      };
    }
    case types.EDIT_EVENT: {
      return {
        ...state,
        eventList: {
          ...currentEventList,
          [keyDatePayload]: currentEventList?.[keyDatePayload]?.map((item) => {
            if (item.id === payload.id) {
              return { ...item, ...payload.data };
            }
            return item;
          }),
        },
      };
    }
    default:
      return state;
  }
}
