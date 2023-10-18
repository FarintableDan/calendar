import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Flex, Input, TimePicker } from "antd";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";

import { ConfirmPanel } from "../../components/ConfirmPanel/ConfirmPanel";
import { editEvent } from "../../modules/actions";
import { getSelectedDate } from "../../utils/helpers/date";

import "./EditEvent.css";

export const EditEvent = ({ closeSidebar, editId }) => {
  const dispatch = useDispatch();
  const { urlDate } = useParams();
  const {
    title: eventTitle,
    from: eventFrom,
    to: eventTo,
  } = useSelector((state) => state.eventList[urlDate])[0];

  const [title, setTitle] = useState(eventTitle);
  const [from, setFrom] = useState(eventFrom);
  const [to, setTo] = useState(eventTo);
  const onChangeFrom = (date) => {
    setFrom(date);
    if (date > to) {
      setTo(dayjs(date).add(1, "m"));
    }
  };
  const onChangeTo = (date) => {
    if (date < from) {
      return false;
    }

    return setTo(date);
  };
  const onChangeTitle = (e) => setTitle(e.target.value);
  const onConfirm = () => {
    const data = {
      title,
      from: getSelectedDate(urlDate, from),
      to: getSelectedDate(urlDate, to),
    };
    dispatch(editEvent(urlDate, data, editId));
    closeSidebar();
  };
  return (
    <Flex className="createEvent" vertical>
      <h2>Редактировать задачу</h2>
      <Input
        value={title}
        onChange={onChangeTitle}
        className="createEvent__input"
        placeholder="Название задачи..."
      />
      <TimePicker
        value={from}
        onChange={onChangeFrom}
        className="createEvent__datePicker"
        changeOnBlur
        allowClear={false}
      />
      <TimePicker
        value={to}
        onChange={onChangeTo}
        className="createEvent__datePicker"
        changeOnBlur
        allowClear={false}
      />
      <div className="footer"></div>
      <ConfirmPanel
        disabled={!title.trim().length}
        onCancel={closeSidebar}
        onConfirm={onConfirm}
      />
    </Flex>
  );
};
