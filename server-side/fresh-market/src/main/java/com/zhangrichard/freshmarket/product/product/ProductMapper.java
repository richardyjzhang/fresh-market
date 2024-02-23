package com.zhangrichard.freshmarket.product.product;

import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface ProductMapper {

    @Select(" SELECT `id`, `name`, `category_id` AS categoryId, `type`, " +
            "   `specification`, `current_price` AS currentPrice, `inventory` " +
            " FROM `product` ")
    List<Product> listProducts();

    @Insert(" INSERT INTO `product` " +
            " (`id`, `name`, `category_id`, `type`, `specification`, " +
            "  `current_price`, `inventory` ) VALUES " +
            " (#{id}, #{name}, #{categoryId}, #{type}, #{specification}, " +
            "  #{currentPrice}, #{inventory} )")
    void addOneProduct(Product product);

    @Delete(" DELETE FROM `product` " +
            " WHERE `id` = #{id} ")
    void deleteOneProductById(String id);

    @Update(" UPDATE `product` SET `current_price` = #{price} " +
            " WHERE `id` = #{id} ")
    void updateOneProductPrice(String id, Double price);

    @Update(" UPDATE `product` SET `inventory` = #{inventory} " +
            " WHERE `id` = #{id} ")
    void updateOneProductInventory(String id, Integer inventory);
}
