package com.wp.bookstore.Repository;

import com.wp.bookstore.Models.Author;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AuthorRepository extends JpaRepository<Author,Long> {
    List<Author> findAll();
    Author getById(Long id);
    Author save(Author a);
}
