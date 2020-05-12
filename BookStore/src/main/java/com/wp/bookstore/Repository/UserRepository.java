package com.wp.bookstore.Repository;

import com.wp.bookstore.Models.Book;
import com.wp.bookstore.Models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<User,Long>{

    User findByUsername(String username);
    User save(User user);
    User getById(Long id);
    User getByUsername(String username);


}
