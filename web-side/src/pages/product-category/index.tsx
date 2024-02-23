import React, { useState } from "react";
import {
  Button,
  Card,
  Divider,
  Form,
  Input,
  Popconfirm,
  Table,
  TableProps,
  ConfigProvider,
  Modal,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  ReloadOutlined,
  ShoppingOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { useRequest } from "ahooks";
import {
  fetchProductCategoriesRequest,
  addOneProductCategoryRequest,
  deleteOneProductCategoryRequest,
  updateOneProductCategoryRequest,
} from "./service";
import styles from "./index.css";

const ProductCategoryPage: React.FC = () => {
  // 弹窗展示
  const [modalOpen, setModalOpen] = useState(false);
  const [curCategory, setCurCategory] =
    useState<API.Product.ProductCategory | null>(null);

  // 各种网络请求
  const { runAsync: fetchProductCategories, data: productCategories } =
    useRequest(fetchProductCategoriesRequest);
  const { runAsync: addOneProductCategory } = useRequest(
    addOneProductCategoryRequest,
    {
      manual: true,
    }
  );
  const { runAsync: updateOneProductCategory } = useRequest(
    updateOneProductCategoryRequest,
    {
      manual: true,
    }
  );
  const { runAsync: deleteOneProductCategory } = useRequest(
    deleteOneProductCategoryRequest,
    {
      manual: true,
    }
  );

  // 删除一个产品类别
  const onDelete = async (id: string) => {
    const _ = await deleteOneProductCategory(id);
    await fetchProductCategories();
  };

  // 主体表格配置
  const columns: TableProps<API.Product.ProductCategory>["columns"] = [
    {
      title: "类别ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "类别名称",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "更新时间",
      dataIndex: "ct",
      key: "ct",
    },
    {
      title: "操作",
      key: "operation",
      render: (_, category) => {
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
                className={styles.relatedButton}
                icon={<ShoppingOutlined />}
                type="link"
              >
                相关商品
              </Button>
              <Button
                className={styles.operationButton}
                icon={<EditOutlined />}
                type="link"
                onClick={() => {
                  setCurCategory(category);
                  setModalOpen(true);
                }}
              >
                编辑
              </Button>
            </ConfigProvider>
            <ConfigProvider
              theme={{
                token: {
                  colorLink: "#b90f00",
                },
              }}
            >
              <Popconfirm
                title="删除商品类别"
                description="此操作无法恢复。是否确认删除？"
                okText="确认"
                cancelText="取消"
                icon={
                  <ExclamationCircleOutlined style={{ color: "#b90f00" }} />
                }
                onConfirm={() => {
                  if (category.id) {
                    onDelete(category.id);
                  }
                }}
              >
                <Button
                  className={styles.operationButton}
                  icon={<DeleteOutlined />}
                  type="link"
                >
                  删除
                </Button>
              </Popconfirm>
            </ConfigProvider>
          </div>
        );
      },
    },
  ];

  // 新增编辑弹窗
  const AddEditModal = () => {
    const onFormFinished = async (category: API.Product.ProductCategory) => {
      if (!curCategory?.id) {
        await addOneProductCategory(category);
      } else {
        category.id = curCategory.id;
        await updateOneProductCategory(category);
      }
      setModalOpen(false);
      setCurCategory(null);
      fetchProductCategories();
    };

    return (
      <Modal
        className={styles.addEditModal}
        open={modalOpen}
        title={`${!!curCategory ? "编辑类别" : "新增类别"}`}
        footer={null}
        onCancel={() => {
          setModalOpen(false);
          setCurCategory(null);
        }}
      >
        <div className={styles.addEditForm}>
          <Divider />
          <Form onFinish={onFormFinished}>
            <Form.Item
              name="name"
              label="商品类别名称"
              rules={[{ required: true }]}
            >
              <Input
                placeholder="商品类别名称"
                defaultValue={curCategory?.name}
              />
            </Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className={styles.addEditButton}
            >
              确认
            </Button>
          </Form>
        </div>
      </Modal>
    );
  };

  return (
    <Card className={styles.mainCard} title="商品类别管理">
      <div className={styles.search}>
        <Button
          icon={<PlusOutlined />}
          type="primary"
          onClick={() => {
            setModalOpen(true);
          }}
        >
          新增
        </Button>
        <div className={styles.space} />
        <Button
          icon={<ReloadOutlined />}
          type="primary"
          onClick={() => {
            fetchProductCategories();
          }}
        >
          刷新
        </Button>
      </div>
      <Table rowKey="id" columns={columns} dataSource={productCategories} />
      <AddEditModal />
    </Card>
  );
};

export default ProductCategoryPage;
