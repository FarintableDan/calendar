import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { notification } from "antd";
import dayjs from "dayjs";

import { getTimeDiff, toFormat } from "../../utils/helpers/date";
import { removeFromNotificationQue } from "../../modules/actions";

const DELAY_BEFORE_NOTIFICATION_REMOVE = -5;

export const Notification = ({ from, to, title, id }) => {
  const dispatch = useDispatch();
  const [api, contextHolder] = notification.useNotification();
  const [timer, setTimer] = useState(() => getTimeDiff(dayjs(), from));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((time) => time - 1);
    }, 1000);

    if (timer === 0) {
      api.open({
        message: "Напоминание",
        description: `У вас запланированно "${title}" c ${toFormat(
          from,
          "HH:mm",
        )} по ${toFormat(to, "HH:mm")}`,
        duration: 0,
      });
    }

    if (timer === DELAY_BEFORE_NOTIFICATION_REMOVE) {
      dispatch(removeFromNotificationQue(id));
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [timer]);

  return <>{contextHolder}</>;
};
