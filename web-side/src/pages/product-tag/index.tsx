import React, { useState } from "react";
import { Button, Card, Divider, Form, Input, Popconfirm, Table, TableProps, ConfigProvider, Modal } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined, ReloadOutlined, ShoppingOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { useRequest } from 'ahooks';
import { fetchProductTagsRequest, addOneProductTagRequest, deleteOneProductTagRequest, updateOneProductTagRequest } from './service';
import styles from './index.css';

const ProductTagPage: React.FC = () => {

    // 弹窗展示
    const [modalOpen, setModalOpen] = useState(false);
    const [curTag, setCurTag] = useState<API.Product.ProductTag | null>(null);

    // 各种网络请求
    const { runAsync: fetchProductTags, data: productTags } = useRequest(fetchProductTagsRequest);
    const { runAsync: addOneProductTag } = useRequest(addOneProductTagRequest, {
        manual: true,
    })
    const { runAsync: updateOneProductTag } = useRequest(updateOneProductTagRequest, {
        manual: true,
    })
    const { runAsync: deleteOneProductTag } = useRequest(deleteOneProductTagRequest, {
        manual: true,
    })

    // 删除一个产品标签
    const onDelete = async (id: string) => {
        const _ = await deleteOneProductTag(id);
        await fetchProductTags();
    }

    // 主体表格配置
    const columns: TableProps<API.Product.ProductTag>['columns'] = [
        {
            title: '标签ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: '标签名称',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '更新时间',
            dataIndex: 'ct',
            key: 'ct',
        },
        {
            title: '操作',
            key: 'operation',
            render: (_, tag) => {
                return (
                    <div className={styles.operations}>
                        <ConfigProvider theme={{
                            token: {
                                colorLink: '#00b96b'
                            }
                        }}>
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
                                    setCurTag(tag);
                                    setModalOpen(true);
                                }}
                            >
                                编辑
                            </Button>
                        </ConfigProvider>
                        <ConfigProvider theme={{
                            token: {
                                colorLink: '#b90f00'
                            }
                        }}>
                            <Popconfirm
                                title="删除商品标签"
                                description="此操作无法恢复。是否确认删除？"
                                okText="确认"
                                cancelText="取消"
                                icon={<ExclamationCircleOutlined style={{ color: '#b90f00' }} />}
                                onConfirm={() => {
                                    if (tag.id) {
                                        onDelete(tag.id);
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
                    </div >
                )
            }
        }
    ];

    // 新增编辑弹窗
    const AddEditModal = () => {

        const onFormFinished = async (tag: API.Product.ProductTag) => {
            if (!curTag?.id) {
                await addOneProductTag(tag);
            } else {
                tag.id = curTag.id;
                await updateOneProductTag(tag);
            }
            setModalOpen(false);
            setCurTag(null);
            fetchProductTags();
        }

        return (
            <Modal
                className={styles.addEditModal}
                open={modalOpen}
                title={`${!!curTag ? '编辑标签' : '新增标签'}`}
                footer={null}
                onCancel={() => {
                    setModalOpen(false);
                    setCurTag(null);
                }}
            >
                <div className={styles.addEditForm}>
                    <Divider />
                    <Form onFinish={onFormFinished}>
                        <Form.Item name="name" label="商品标签名称">
                            <Input placeholder="商品标签名称" defaultValue={curTag?.name} />
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
    }

    return (
        <Card
            className={styles.mainCard}
            title="商品标签管理"
        >
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
                        fetchProductTags();
                    }}
                >
                    刷新
                </Button>
            </div>
            <Table columns={columns} dataSource={productTags} />
            <AddEditModal />
        </Card>
    );
}

export default ProductTagPage;