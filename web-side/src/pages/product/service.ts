import request from "@/utils/request";

// 获取商品列表
export async function fetchProductsRequest() {
  const response = await request("/api/products");
  return response;
}
