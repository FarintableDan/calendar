import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";

import "./BaseLayout.css";

export const BaseLayout = ({ children }) => {
  return (
    <Layout className="baseLayout__layout">
      <Content className="baseLayout__content">{children}</Content>
    </Layout>
  );
};
