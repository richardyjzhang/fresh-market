package com.zhangrichard.freshmarket.product;

import com.zhangrichard.freshmarket.utils.MyIDGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

/**
 * 商品类别管理
 */
@RestController
public class ProductCategoryController {

    @Autowired
    ProductCategoryMapper productCategoryMapper;

    @GetMapping("/product-categories")
    List<ProductCategory> listProductCategories() {
        List<ProductCategory> categories = productCategoryMapper.listProductCategories();
        return categories;
    }

    @PostMapping("/product-category")
    ProductCategory addOneProductCategory(@RequestBody ProductCategory category,
                                          HttpServletResponse response) {

        String name = category.getName();
        ProductCategory exists = productCategoryMapper.getOneProductCategoryByName(name);

        // 不允许重复添加
        if (exists != null) {
            response.setStatus(HttpStatus.BAD_REQUEST.value());
            return null;
        }

        category.setId(MyIDGenerator.newID());
        category.setCt(MyIDGenerator.newTime());
        productCategoryMapper.addOneProductCategoryByName(category);

        response.setStatus(HttpStatus.CREATED.value());
        return category;
    }

    @DeleteMapping("/product-category/{id}")
    void deleteOneProductCategory(@PathVariable String id,
                                  HttpServletResponse response) {

        // TODO 如果已经有商品从属于该类别，则不允许删除
        productCategoryMapper.deleteOneProductCategoryById(id);
        response.setStatus(HttpStatus.NO_CONTENT.value());
    }

    @PutMapping("/product-category/{id}")
    ProductCategory updateOneProductCategory(@PathVariable String id,
                                             @RequestBody ProductCategory category,
                                             HttpServletResponse response) {

        String name = category.getName();
        ProductCategory exists = productCategoryMapper.getOneProductCategoryByName(name);

        // 不允许重复添加
        if (exists != null) {
            response.setStatus(HttpStatus.BAD_REQUEST.value());
            return null;
        }

        String ct = MyIDGenerator.newTime();
        category.setId(id);
        category.setCt(ct);
        productCategoryMapper.updateOneProductCategoryName(category);

        return category;
    }

}
