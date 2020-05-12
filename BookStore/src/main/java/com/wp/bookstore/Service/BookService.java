package com.wp.bookstore.Service;

import com.wp.bookstore.Models.Book;
import com.wp.bookstore.Models.Category;
import com.wp.bookstore.Models.User;

import java.util.List;

public interface BookService {
    List<Book> getAll();
    Book getById(Long id);
    List<Book> getBestsellers();
    List<Book> getAllByCategory(Category category);
    Book save(Book b);
    List<Book> findByWish(User u);
    List<Book> findByCart(User u);
}
