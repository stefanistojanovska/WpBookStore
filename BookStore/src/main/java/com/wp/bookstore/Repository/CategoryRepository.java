package com.wp.bookstore.Repository;

import com.wp.bookstore.Models.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category,Long> {
    List<Category> findAll();
    Category getByCategoryName(String name);
    //Category getCategoriesById(Long id);
    Category getCategoryById(Long id);
    //Category findAllByCategoryName(String name);
}
