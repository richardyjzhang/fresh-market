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
}
