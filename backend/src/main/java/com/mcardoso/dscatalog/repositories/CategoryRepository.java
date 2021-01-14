package com.mcardoso.dscatalog.repositories;

import com.mcardoso.dscatalog.entities.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}
