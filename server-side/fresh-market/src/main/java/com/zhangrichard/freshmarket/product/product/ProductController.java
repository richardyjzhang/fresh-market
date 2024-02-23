package com.zhangrichard.freshmarket.product.product;

import com.zhangrichard.freshmarket.utils.MyIDGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

@RestController
public class ProductController {

    @Autowired
    ProductMapper productMapper;

    @GetMapping("/products")
    List<Product> listProducts() {
        List<Product> products = productMapper.listProducts();
        return products;
    }

    @PostMapping("/product")
    Product addOneProduct(@RequestBody Product product,
                          HttpServletResponse response) {

        product.setId(MyIDGenerator.newID());
        productMapper.addOneProduct(product);

        response.setStatus(HttpStatus.CREATED.value());
        return product;
    }

    @DeleteMapping("/product/{id}")
    void deleteOneProductById(@PathVariable String id,
                              HttpServletResponse response) {

        productMapper.deleteOneProductById(id);
        response.setStatus(HttpStatus.NO_CONTENT.value());
    }

    @PutMapping("/product/price/{id}")
    void updateOneProductPrice(@PathVariable String id,
                               @RequestBody Product product) {

        productMapper.updateOneProductPrice(id, product.getCurrentPrice());
    }

    @PutMapping("/product/inventory/{id}")
    void updateOneProductInventory(@PathVariable String id,
                                   @RequestBody Product product) {

        productMapper.updateOneProductInventory(id, product.getInventory());
    }
}
