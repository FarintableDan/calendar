import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";

import { Notification } from "../Notification/Notification";
import { HomePage } from "../../pages/HomePage/HomePage";
import { ManageEventsPage } from "../../pages/ManageEventsPage/ManageEventsPage";
import { BaseLayout } from "../../components/BaseLayout/BaseLayout";

function App() {
  const notificationQue = useSelector((state) => state.notificationQue);
  console.log(notificationQue);
  return (
    <div className="App">
      <BaseLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/:urlDate" element={<ManageEventsPage />} />
        </Routes>
        {notificationQue.map((notification) => (
          <Notification key={notification.from} {...notification} />
        ))}
      </BaseLayout>
    </div>
  );
}

export default App;
