import React from "react";
import { Menu } from "antd";
import { useLocation, history } from "umi";
import styles from "./index.css";

const MyMenu: React.FC = () => {
  const location = useLocation();

  return (
    <Menu
      className={styles.menu}
      mode="inline"
      style={{
        marginTop: "1rem",
      }}
      selectedKeys={[location.pathname]}
      onClick={({ key }) => {
        history.push(key);
      }}
      items={[
        {
          key: "/dashboard",
          label: "经营概览",
        },
        {
          key: "/product-management",
          label: "商品相关",
          children: [
            {
              key: "/product-category",
              label: "类别管理",
            },
            {
              key: "/product-tag",
              label: "标签管理",
            },
            {
              key: "/product",
              label: "商品管理",
            },
          ],
        },
        {
          key: "/order-management",
          label: "订单相关",
          children: [
            {
              key: "/order",
              label: "订单管理",
            },
          ],
        },
      ]}
    />
  );
};

export default MyMenu;
