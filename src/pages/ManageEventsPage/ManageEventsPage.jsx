import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Button, message } from "antd";

import { EventItem } from "../../components/EventItem/EventItem";
import { EventList } from "../../components/EventList/EventList";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { CreateEvent } from "../../containers/CreateEvent/CreateEvent";
import { EditEvent } from "../../containers/EditEvent/EditEvent";

import usePrevious from "../../utils/hooks/usePrevious";
import { removeEvent } from "../../modules/actions";

import "./ManageEventsPage.css";

const deleteEvent = {
  type: "error",
  content: "Событие успешно удалено!",
  duration: 2,
};

const addEvent = {
  type: "success",
  content: "Новое событыие успешно добавленно!",
  duration: 2,
};

export const ManageEventsPage = () => {
  const dispatch = useDispatch();
  const { urlDate } = useParams();
  const [messageApi, contextHolder] = message.useMessage();
  const events = useSelector((state) => state.eventList?.[urlDate]) || [];
  const prevEventList = usePrevious(events.length);

  const [isOpenCreateSidebar, setIsOpenCreateSidebar] = useState(false);
  const [isOpenEditSidebar, setIsOpenEditSidebar] = useState(null);

  const showCreateSidebar = () => setIsOpenCreateSidebar(true);
  const showEditSidebar = (id) => setIsOpenEditSidebar(id || null);
  const closeSidebars = () => {
    setIsOpenEditSidebar(null);
    setIsOpenCreateSidebar(false);
  };
  const onEventRemove = (keyDate, id) => dispatch(removeEvent(keyDate, id));

  const isOpen = isOpenEditSidebar || isOpenCreateSidebar;

  useEffect(() => {
    if (events.length < prevEventList) {
      messageApi.open(deleteEvent);
    }
    if (events.length > prevEventList) {
      messageApi.open(addEvent);
    }
  }, [events]);

  return (
    <>
      {contextHolder}
      <Link to="/">На главную</Link>
      <div>
        <Button
          className="createEvent__button"
          onClick={showCreateSidebar}
          type="primary"
        >
          + Новая задача
        </Button>
      </div>
      <EventList>
        {events.map((eventItem) => (
          <EventItem
            onEventRemove={onEventRemove}
            showEditSidebar={showEditSidebar}
            keyDate={urlDate}
            key={eventItem.id}
            {...eventItem}
          />
        ))}
      </EventList>
      {isOpen && (
        <Sidebar onClose={closeSidebars}>
          {isOpenCreateSidebar && <CreateEvent closeSidebar={closeSidebars} />}
          {isOpenEditSidebar && (
            <EditEvent
              editId={isOpenEditSidebar}
              closeSidebar={closeSidebars}
            />
          )}
        </Sidebar>
      )}
    </>
  );
};
