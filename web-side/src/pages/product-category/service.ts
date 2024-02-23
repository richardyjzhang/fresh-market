import request from "@/utils/request";

// 获取商品类别列表
export async function fetchProductCategoriesRequest() {
  const response = await request("/api/product-categories");
  return response;
}

// 新增一个商品类别
export async function addOneProductCategoryRequest(
  category: API.Product.ProductCategory
) {
  const response = await request("/api/product-category", {
    method: "POST",
    data: category,
  });
  return response;
}

// 更新一个商品类别
export async function updateOneProductCategoryRequest(
  category: API.Product.ProductCategory
) {
  const response = await request(`/api/product-category/${category.id}`, {
    method: "PUT",
    data: category,
  });
  return response;
}

// 删除某个商品类别
export async function deleteOneProductCategoryRequest(id: string) {
  await request(`/api/product-category/${id}`, {
    method: "DELETE",
  });
}
