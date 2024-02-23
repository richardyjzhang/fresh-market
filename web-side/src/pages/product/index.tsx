import React from "react";
import { Button, Card, ConfigProvider, Table, TableProps } from "antd";
import {
  PlusOutlined,
  ReloadOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import { useRequest } from "ahooks";
import { fetchProductsRequest } from "./service";
import styles from "./index.css";

const ProductPage: React.FC = () => {
  // 各种网络请求
  const { runAsync: fetchProducts, data: products } =
    useRequest(fetchProductsRequest);

  // 主体表格配置
  const columns: TableProps<API.Product.Product>["columns"] = [
    {
      title: "商品ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "商品名称",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "商品类别",
      key: "categoryId",
      render: () => {
        return "TODO";
      },
    },
    {
      title: "品类",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "规格",
      dataIndex: "specification",
      key: "specification",
    },
    {
      title: "单价",
      dataIndex: "currentPrice",
      key: "currentPrice",
    },
    {
      title: "库存",
      dataIndex: "inventory",
      key: "inventory",
    },
    {
      title: "操作",
      key: "operation",
      render: (_, product) => {
        return (
          <div className={styles.operations}>
            <ConfigProvider
              theme={{
                token: {
                  colorLink: "#00b96b",
                },
              }}
            >
              <Button
                className={styles.detailButton}
                icon={<ShoppingOutlined />}
                type="link"
              >
                商品详情
              </Button>
            </ConfigProvider>
          </div>
        );
      },
    },
  ];

  return (
    <Card className={styles.mainCard} title="商品管理">
      <div className={styles.search}>
        <Button
          icon={<PlusOutlined />}
          type="primary"
          onClick={() => {
            // setModalOpen(true);
          }}
        >
          新增
        </Button>
        <div className={styles.space} />
        <Button
          icon={<ReloadOutlined />}
          type="primary"
          onClick={() => {
            fetchProducts();
          }}
        >
          刷新
        </Button>
      </div>
      <Table columns={columns} dataSource={products} />
    </Card>
  );
};

export default ProductPage;
