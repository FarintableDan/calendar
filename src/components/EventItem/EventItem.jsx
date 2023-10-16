import { Divider, Flex, Row } from "antd";

import { toFormat } from "../../utils/helpers/date";

import "./EventItem.css";

export const EventItem = ({
  title,
  from,
  to,
  id,
  keyDate,
  onEventRemove,
  showEditSidebar,
}) => {
  return (
    <Row className="event-item" justify="space-between" align="middle">
      <Flex vertical>
        <h3 className="event-item__title">{title}</h3>
        <div>
          с {toFormat(from, "HH:mm")} до {toFormat(to, "HH:mm")}
        </div>
      </Flex>
      <Flex>
        <a onClick={() => onEventRemove(keyDate, id)}>Удалить</a>
        <Divider type="vertical" />
        <a onClick={() => showEditSidebar(id)}>Редактировать</a>
      </Flex>
    </Row>
  );
};
