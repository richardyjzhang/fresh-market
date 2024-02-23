declare namespace API {
  namespace Product {
    // 商品类别
    type ProductCategory = {
      id?: string;
      name: string;
      ct?: string;
    };

    // 商品标签
    type ProductTag = {
      id?: string;
      name: string;
      ct?: string;
    };

    // 商品
    type Product = {
      id?: string;
      name: string;
      categoryId: string;
      type: string;
      specification: string;
      currentPrice: number;
      inventory: number;
    };
  }
}
