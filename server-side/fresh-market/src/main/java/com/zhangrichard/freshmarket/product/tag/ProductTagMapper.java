package com.zhangrichard.freshmarket.product.tag;

import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface ProductTagMapper {


    @Select(" SELECT `id`, `name`, `ct` FROM `product_tag` " +
            " ORDER BY `ct` ")
    List<ProductTag> listProductTags();

    @Select(" SELECT `id`, `name` FROM `product_tag` " +
                   " WHERE `name` = #{name} LIMIT 1")
    ProductTag getOneProductTagByName(String name);

    @Insert(" INSERT INTO `product_tag` (`id`, `name`, `ct`) " +
            " VALUES (#{id}, #{name}, #{ct}) ")
    void addOneProductTagByName(ProductTag tag);

    @Delete(" DELETE FROM `product_tag` " +
            " WHERE `id` = #{id} ")
    void deleteOneProductTagById(String id);

    @Update(" UPDATE `product_tag` SET `name` = #{name}, " +
            " `ct` = #{ct} WHERE `id` = #{id}")
    void updateOneProductTagName(ProductTag tag);

}
