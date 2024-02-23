import request from "@/utils/request";

// 获取商品列表
export async function fetchProductsRequest() {
  const response = await request<API.Product.Product[]>("/api/products");
  return response;
}

// 添加一个商品
export async function addOneProductRequest(product: API.Product.Product) {
  const response = await request("/api/product", {
    method: "POST",
    data: product,
  });
  return response;
}

// 删除一个商品
export async function deleteOneProductRequest(id: string) {
  await request(`/api/product/${id}`, {
    method: "DELETE",
  });
}
