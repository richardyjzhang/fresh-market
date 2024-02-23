package com.zhangrichard.freshmarket.product.product;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface ProductMapper {

    @Select(" SELECT `id`, `name`, `category_id` AS categoryId, `type`, " +
            "   `specification`, `current_price` AS currentPrice, `inventory` " +
            " FROM `product` ")
    List<Product> listProducts();
}
