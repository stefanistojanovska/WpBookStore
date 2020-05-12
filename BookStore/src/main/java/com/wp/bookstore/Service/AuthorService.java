package com.wp.bookstore.Service;

import com.wp.bookstore.Models.Author;

import java.util.List;

public interface AuthorService {
    List<Author> getAll();
    Author getById(Long id);
    Author save (Author a);
}
