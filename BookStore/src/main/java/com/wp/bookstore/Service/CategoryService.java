package com.wp.bookstore.Service;

import com.wp.bookstore.Models.Category;

import java.util.List;

public interface CategoryService {
    List<Category> getAll();
    Category findByName(String cat);
    Category getById(Long id);
}
