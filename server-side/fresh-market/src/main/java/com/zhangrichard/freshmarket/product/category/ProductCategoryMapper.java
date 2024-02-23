package com.zhangrichard.freshmarket.product.category;

import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface ProductCategoryMapper {

    @Select(" SELECT `id`, `name`, `ct` FROM `product_category` " +
            " ORDER BY `ct` ")
    List<ProductCategory> listProductCategories();

    @Select(" SELECT `id`, `name` FROM `product_category` " +
            " WHERE `name` = #{name} LIMIT 1")
    ProductCategory getOneProductCategoryByName(String name);

    @Insert(" INSERT INTO `product_category` (`id`, `name`, `ct`) " +
            " VALUES (#{id}, #{name}, #{ct}) ")
    void addOneProductCategoryByName(ProductCategory category);

    @Delete(" DELETE FROM `product_category` " +
            " WHERE `id` = #{id} ")
    void deleteOneProductCategoryById(String id);

    @Update(" UPDATE `product_category` SET `name` = #{name}, " +
            " `ct` = #{ct} WHERE `id` = #{id}")
    void updateOneProductCategoryName(ProductCategory category);


}
