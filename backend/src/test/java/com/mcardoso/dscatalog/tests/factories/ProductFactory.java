package com.mcardoso.dscatalog.tests.factories;

import com.mcardoso.dscatalog.dto.ProductDTO;
import com.mcardoso.dscatalog.entities.Category;
import com.mcardoso.dscatalog.entities.Product;

import java.time.Instant;

public class ProductFactory {

    public static Product createProduct(){
        Product product = new Product(1L, "Phone", "Good Phone", 800.00, "https://img.com/img.png", Instant.parse("2021-02-25T03:00:00Z"));
        product.getCategories().add(new Category(4L, null));
        return product;
    }

    public static ProductDTO createProductDTO() {
        Product product = createProduct();
        return new ProductDTO(product, product.getCategories());
    }

    public static ProductDTO createProductDTO(Long id) {
        ProductDTO dto = createProductDTO();
        dto.setId(id);
        return dto;
    }
}
