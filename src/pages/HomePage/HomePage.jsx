import { CalendarWrapper } from "../../components/CalendarWrapper/CalendarWrapper";
import { useSelector } from "react-redux";

export const HomePage = () => {
  const eventList = useSelector((state) => state.eventList);
  return <CalendarWrapper data={eventList} link="/" />;
};
