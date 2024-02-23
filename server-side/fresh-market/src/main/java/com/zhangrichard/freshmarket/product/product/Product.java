package com.zhangrichard.freshmarket.product.product;

import lombok.Data;

/**
 * 商品
 */
@Data
public class Product {
    private String id;
    private String name;
    // 从属商品类别ID
    private String categoryId;
    // 用户自定义描述的类型
    private String type;
    // 商品规格
    private String specification;
    // 当前价格
    private Double currentPrice;
    // 当前库存
    private Integer inventory;
}
