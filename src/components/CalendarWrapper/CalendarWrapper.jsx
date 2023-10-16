import { Calendar, Tooltip } from "antd";
import { useNavigate } from "react-router-dom";

import { getShortData, parseDate } from "../../utils/helpers/date";

import "./CalendarWrapper.css";

const dateCellRender = (value, eventList) => {
  const listData = getShortData(value);
  const item = eventList?.[listData];
  if (!item) return null;
  return (
    <ul className="calendar-cell">
      {item.map((i) => (
        <Tooltip key={i.id} title={i.title}>
          <div className="calendar-cell__item">{i.title}</div>
        </Tooltip>
      ))}
    </ul>
  );
};

const cellRender = (current, info, dates) => {
  if (info.type === "date") return dateCellRender(current, dates);
  return info.originNode;
};

export const CalendarWrapper = ({ data, link = "/" }) => {
  let navigate = useNavigate();

  const onSelectChange = (e, { source }) => {
    if (source === "date") {
      navigate(`${link}${parseDate(e.$d)}`);
    }
  };
  return (
    <Calendar
      onSelect={onSelectChange}
      cellRender={(current, info) => cellRender(current, info, data)}
    />
  );
};
