package com.wp.bookstore.Service.impl;

import com.wp.bookstore.Models.Author;
import com.wp.bookstore.Repository.AuthorRepository;
import com.wp.bookstore.Service.AuthorService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuthorServiceImpl implements AuthorService {
    private AuthorRepository authorRepository;

    public AuthorServiceImpl(AuthorRepository authorRepository) {
        this.authorRepository = authorRepository;
    }

    @Override
    public List<Author> getAll() {
        return authorRepository.findAll();
    }

    @Override
    public Author getById(Long id) {
        return authorRepository.getById(id);
    }

    @Override
    public Author save(Author a) {
        return  authorRepository.save(a);
    }
}
