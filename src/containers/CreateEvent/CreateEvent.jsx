import { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Flex, Input, TimePicker } from "antd";
import dayjs from "dayjs";

import { ConfirmPanel } from "../../components/ConfirmPanel/ConfirmPanel";
import { addEvent } from "../../modules/actions";
import { getSelectedDate } from "../../utils/helpers/date";

import "./CreateEvent.css";

export const CreateEvent = ({ closeSidebar }) => {
  const dispatch = useDispatch();
  const { urlDate } = useParams();
  const [title, setTitle] = useState("");
  const [from, setFrom] = useState(dayjs());
  const [to, setTo] = useState(dayjs().add(1, "h"));
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

    dispatch(addEvent(urlDate, data));

    closeSidebar();
  };
  return (
    <Flex className="createEvent" vertical>
      <h2>Создать задачу</h2>
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
