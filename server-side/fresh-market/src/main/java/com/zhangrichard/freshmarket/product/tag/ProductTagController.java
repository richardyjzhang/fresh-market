package com.zhangrichard.freshmarket.product.tag;

import com.zhangrichard.freshmarket.utils.MyIDGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

/**
 * 商品标签管理
 */
@RestController
public class ProductTagController {

    @Autowired
    ProductTagMapper productTagMapper;

    @GetMapping("/product-tags")
    List<ProductTag> listProductTags() {
        List<ProductTag> tags = productTagMapper.listProductTags();
        return tags;
    }

    @PostMapping("/product-tag")
    ProductTag addOneProductTag(@RequestBody ProductTag tag,
                                          HttpServletResponse response) {

        String name = tag.getName();
        ProductTag exists = productTagMapper.getOneProductTagByName(name);

        // 不允许重复添加
        if (exists != null) {
            response.setStatus(HttpStatus.BAD_REQUEST.value());
            return null;
        }

        tag.setId(MyIDGenerator.newID());
        tag.setCt(MyIDGenerator.newTime());
        productTagMapper.addOneProductTagByName(tag);

        response.setStatus(HttpStatus.CREATED.value());
        return tag;
    }

    @DeleteMapping("/product-tag/{id}")
    void deleteOneProductTag(@PathVariable String id,
                                  HttpServletResponse response) {


        productTagMapper.deleteOneProductTagById(id);
        response.setStatus(HttpStatus.NO_CONTENT.value());
    }

    @PutMapping("/product-tag/{id}")
    ProductTag updateOneProductTag(@PathVariable String id,
                                             @RequestBody ProductTag tag,
                                             HttpServletResponse response) {

        String name = tag.getName();
        ProductTag exists = productTagMapper.getOneProductTagByName(name);

        // 不允许重复添加
        if (exists != null) {
            response.setStatus(HttpStatus.BAD_REQUEST.value());
            return null;
        }

        String ct = MyIDGenerator.newTime();
        tag.setId(id);
        tag.setCt(ct);
        productTagMapper.updateOneProductTagName(tag);

        return tag;
    }

}
