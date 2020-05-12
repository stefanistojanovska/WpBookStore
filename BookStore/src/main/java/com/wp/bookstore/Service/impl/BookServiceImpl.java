package com.wp.bookstore.Service.impl;

import com.wp.bookstore.Models.Book;
import com.wp.bookstore.Models.Category;
import com.wp.bookstore.Models.User;
import com.wp.bookstore.Repository.BookRepository;
import com.wp.bookstore.Service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookServiceImpl implements BookService {
    private BookRepository bookRepository;

    @Autowired
    public BookServiceImpl(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    @Override
    public List<Book> getAll() {
        return bookRepository.findAll();
    }

    @Override
    public Book getById(Long id) {
        return  bookRepository.getById(id);
    }

    @Override
    public List<Book> getBestsellers() {
        return bookRepository.findAllByBestsellerIsTrue();
    }

    @Override
    public List<Book> getAllByCategory(Category category) {
        return bookRepository.findAllByCategories(category);
    }

    @Override
    public Book save(Book b) {
        return bookRepository.save(b);
    }

    @Override
    public List<Book> findByWish(User u) {
        return bookRepository.findByWishList(u);
    }

    @Override
    public List<Book> findByCart(User u) {
        return bookRepository.findByBooksCart(u);
    }


}
