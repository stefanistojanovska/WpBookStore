package com.wp.bookstore.Repository;

import com.wp.bookstore.Models.Book;
import com.wp.bookstore.Models.Category;
import com.wp.bookstore.Models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BookRepository extends JpaRepository<Book,Long> {
    List<Book> findAll();
    Book getById(Long id);
    List<Book> findAllByBestsellerIsTrue();
    List<Book> findAllByCategories(Category category);
    Book save(Book book);
    List<Book> findByWishList(User u);
    List<Book> findByBooksCart(User u);







    /*@Query("select t from Test t join User u where u.username = :username")
List<Test> findAllByUsername(@Param("username")String username);*/

}
