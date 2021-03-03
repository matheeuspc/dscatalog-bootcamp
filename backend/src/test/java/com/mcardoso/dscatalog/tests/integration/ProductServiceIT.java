package com.mcardoso.dscatalog.tests.integration;

import com.mcardoso.dscatalog.dto.ProductDTO;
import com.mcardoso.dscatalog.services.ProductService;
import com.mcardoso.dscatalog.services.exceptions.ResourceNotFoundException;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@Transactional
public class ProductServiceIT {

    @Autowired
    private ProductService service;

    private Long existingId;
    private Long nonExistingId;
    private Long countTotalProducts;
    private Long countPCGamerProducts;
    private PageRequest pageRequest;

    @BeforeEach
    void setUp() throws Exception {
        existingId = 1L;
        nonExistingId = 1000L;
        countTotalProducts = 25L;
        countPCGamerProducts = 21L;
        pageRequest = PageRequest.of(0, 10);
    }

    @Test
    public void findAllPagedShouldReturnNothingWhenNameDoesNotExist() {
        String name = "Food";

        Page<ProductDTO> result = service.findAllPaged(0L, name, pageRequest);

        Assertions.assertTrue(result.isEmpty());
    }


    @Test
    public void findAllPagedShouldReturnAllProductsWhenNameIsEmpty() {
        String name = "";

        Page<ProductDTO> result = service.findAllPaged(0L, name, pageRequest);

        Assertions.assertFalse(result.isEmpty());
        Assertions.assertEquals(countTotalProducts, result.getTotalElements());
    }

    @Test
    public void findAllPagedShouldReturnProductsWhenNameExistsIgnoringCase() {
        String name = "pC GaMEr";

        Page<ProductDTO> result = service.findAllPaged(0L, name, pageRequest);

        Assertions.assertFalse(result.isEmpty());
        Assertions.assertEquals(countPCGamerProducts, result.getTotalElements());
    }

    @Test
    public void deleteShouldDoNothingWhenIdExists() {
        Assertions.assertDoesNotThrow(() -> {
            service.delete(existingId);
        });
    }

    @Test
    public void deleteShouldThrowResourceNotFoundExceptionWhenIdDoesNotExists() {
        Assertions.assertThrows(ResourceNotFoundException.class, () -> {
            service.delete(nonExistingId);
        });
    }
}
