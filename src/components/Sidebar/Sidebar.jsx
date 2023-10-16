import { Drawer } from "antd";

export const Sidebar = ({ children, onClose }) => {
  return (
    <Drawer onClose={onClose} open={true} className="sidebar">
      {children}
    </Drawer>
  );
};
