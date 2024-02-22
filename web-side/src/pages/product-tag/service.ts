import request from '@/utils/request';

// 获取商品标签列表
export async function fetchProductTagsRequest() {
    const response = await request('/api/product-tags');
    return response;
}

// 新增一个商品标签
export async function addOneProductTagRequest(tag: API.Product.ProductTag) {
    const response = await request('/api/product-tag', {
        method: 'POST',
        data: tag,
    });
    return response;
}

// 更新一个商品标签
export async function updateOneProductTagRequest(tag: API.Product.ProductTag) {
    const response = await request(`/api/product-tag/${tag.id}`, {
        method: 'PUT',
        data: tag,
    });
    return response;
}

// 删除某个商品标签
export async function deleteOneProductTagRequest(id: string) {
    await request(`/api/product-tag/${id}`, {
        method: "DELETE"
    });
}