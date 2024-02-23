import React, { useState } from "react";
import {
  Button,
  Card,
  ConfigProvider,
  Divider,
  Form,
  Input,
  InputNumber,
  Modal,
  Popconfirm,
  Select,
  Table,
  TableProps,
} from "antd";
import {
  AccountBookOutlined,
  ContainerOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
  PlusOutlined,
  ReloadOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import { useRequest } from "ahooks";
import {
  fetchProductsRequest,
  addOneProductRequest,
  deleteOneProductRequest,
  updateOneProductPriceRequest,
  updateOneProductInventoryRequest,
} from "./service";
import { fetchProductCategoriesRequest } from "@/pages/product-category/service";
import styles from "./index.css";

const ProductPage: React.FC = () => {
  // 弹窗展示
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [priceModalOpen, setPriceModalOpen] = useState(false);
  const [inventoryModalOpen, setInventoryModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] =
    useState<API.Product.Product | null>(null);

  // 各种网络请求
  const { data: productCategories } = useRequest(fetchProductCategoriesRequest);
  const { runAsync: fetchProducts, data: products } =
    useRequest(fetchProductsRequest);
  const { runAsync: addOneProduct } = useRequest(addOneProductRequest, {
    manual: true,
  });
  const { runAsync: deleteOneProduct } = useRequest(deleteOneProductRequest, {
    manual: true,
  });
  const { runAsync: updateOneProductPrice } = useRequest(
    updateOneProductPriceRequest,
    {
      manual: true,
    }
  );
  const { runAsync: updateOneProductInventory } = useRequest(
    updateOneProductInventoryRequest,
    {
      manual: true,
    }
  );

  // 删除一个产品
  const onDelete = async (id: string) => {
    const _ = await deleteOneProduct(id);
    await fetchProducts();
  };

  // 主体表格配置
  const columns: TableProps<API.Product.Product>["columns"] = [
    {
      title: "序号",
      key: "num",
      render: (_, __, index) => {
        return index + 1;
      },
    },
    {
      title: "商品名称",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "商品类别",
      key: "categoryId",
      render: (_, product) => {
        const category = productCategories?.find(
          (c) => c.id === product.categoryId
        );
        return category?.name;
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
                详情
              </Button>
              <Button
                className={styles.operationButton}
                icon={<AccountBookOutlined />}
                type="link"
                onClick={() => {
                  setCurrentProduct(product);
                  setPriceModalOpen(true);
                }}
              >
                调价
              </Button>
              <Button
                className={styles.operationButton}
                icon={<ContainerOutlined />}
                type="link"
                onClick={() => {
                  setCurrentProduct(product);
                  setInventoryModalOpen(true);
                }}
              >
                调库存
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
                title="删除商品"
                description="此操作无法恢复。是否确认删除？"
                okText="确认"
                cancelText="取消"
                icon={
                  <ExclamationCircleOutlined style={{ color: "#b90f00" }} />
                }
                onConfirm={() => {
                  if (product.id) {
                    onDelete(product.id);
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

  // 新增弹窗
  const AddModal = () => {
    const onFormFinished = async (product: API.Product.Product) => {
      await addOneProduct(product);
      setAddModalOpen(false);
      fetchProducts();
    };

    return (
      <Modal
        className={styles.addModal}
        open={addModalOpen}
        title="新增商品"
        footer={null}
        onCancel={() => {
          setAddModalOpen(false);
        }}
      >
        <div className={styles.addForm}>
          <Divider />
          <Form
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 12 }}
            onFinish={onFormFinished}
          >
            <Form.Item name="categoryId" label="商品分类">
              <Select>
                {productCategories?.map((c) => (
                  <Select.Option key={c.id}>{c.name}</Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="name" label="商品名称">
              <Input placeholder="商品名称" />
            </Form.Item>
            <Form.Item name="type" label="商品品类">
              <Input placeholder="用户自定义输入品类" />
            </Form.Item>
            <Form.Item name="specification" label="包装规格">
              <Input placeholder="商品包装规格" />
            </Form.Item>
            <Form.Item name="currentPrice" label="当前单价">
              <InputNumber
                className={styles.inputNumberForm}
                placeholder="商品单价"
              />
            </Form.Item>
            <Form.Item name="inventory" label="当前库存">
              <InputNumber
                className={styles.inputNumberForm}
                placeholder="当前库存"
              />
            </Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className={styles.addButton}
            >
              确认
            </Button>
          </Form>
        </div>
      </Modal>
    );
  };

  // 调整单价弹窗
  const PriceModal = () => {
    const onFormFinished = async (product: API.Product.Product) => {
      if (currentProduct?.id) {
        await updateOneProductPrice(currentProduct.id, product);
      }
      setCurrentProduct(null);
      setPriceModalOpen(false);
      fetchProducts();
    };

    return (
      <Modal
        className={styles.addModal}
        open={priceModalOpen}
        title="调整商品单价"
        footer={null}
        onCancel={() => {
          setPriceModalOpen(false);
        }}
      >
        <div className={styles.addForm}>
          <Divider />
          <Form
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 12 }}
            onFinish={onFormFinished}
          >
            <Form.Item name="name" label="商品名称">
              <Input disabled defaultValue={currentProduct?.name} />
            </Form.Item>
            <Form.Item label="当前单价">
              <InputNumber
                disabled
                className={styles.inputNumberForm}
                defaultValue={currentProduct?.currentPrice}
              />
            </Form.Item>
            <Form.Item name="currentPrice" label="调整后单价">
              <InputNumber
                className={styles.inputNumberForm}
                placeholder="调整后单价"
              />
            </Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className={styles.addButton}
            >
              确认
            </Button>
          </Form>
        </div>
      </Modal>
    );
  };

  // 调整库存弹窗
  const InventoryModal = () => {
    const onFormFinished = async (product: API.Product.Product) => {
      if (currentProduct?.id) {
        await updateOneProductInventory(currentProduct?.id, product);
      }
      setCurrentProduct(null);
      setInventoryModalOpen(false);
      fetchProducts();
    };

    return (
      <Modal
        className={styles.addModal}
        open={inventoryModalOpen}
        title="调整商品库存"
        footer={null}
        onCancel={() => {
          setInventoryModalOpen(false);
        }}
      >
        <div className={styles.addForm}>
          <Divider />
          <Form
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 12 }}
            onFinish={onFormFinished}
          >
            <Form.Item name="name" label="商品名称">
              <Input disabled defaultValue={currentProduct?.name} />
            </Form.Item>
            <Form.Item label="当前库存">
              <InputNumber
                disabled
                className={styles.inputNumberForm}
                defaultValue={currentProduct?.inventory}
              />
            </Form.Item>
            <Form.Item name="inventory" label="调整后库存">
              <InputNumber
                className={styles.inputNumberForm}
                placeholder="调整后库存"
              />
            </Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className={styles.addButton}
            >
              确认
            </Button>
          </Form>
        </div>
      </Modal>
    );
  };

  return (
    <Card className={styles.mainCard} title="商品管理">
      <div className={styles.search}>
        <Button
          icon={<PlusOutlined />}
          type="primary"
          onClick={() => {
            setAddModalOpen(true);
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
      <Table rowKey="id" columns={columns} dataSource={products} />
      <AddModal />
      <PriceModal />
      <InventoryModal />
    </Card>
  );
};

export default ProductPage;
