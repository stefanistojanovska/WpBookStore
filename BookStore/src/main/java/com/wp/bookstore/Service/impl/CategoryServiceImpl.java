package com.wp.bookstore.Service.impl;

import com.wp.bookstore.Models.Category;
import com.wp.bookstore.Repository.CategoryRepository;
import com.wp.bookstore.Service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService {
    private CategoryRepository categoryRepository;
    @Autowired
    public CategoryServiceImpl(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public List<Category> getAll() {
        return categoryRepository.findAll();
    }

    @Override
    public Category findByName(String cat) {
        return categoryRepository.getByCategoryName(cat);
    }

    @Override
    public Category getById(Long id) {
        return categoryRepository.getCategoryById(id);
    }
}
