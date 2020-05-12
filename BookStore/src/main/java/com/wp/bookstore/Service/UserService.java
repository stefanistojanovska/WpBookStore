package com.wp.bookstore.Service;

import com.wp.bookstore.Models.User;

public interface UserService  {
    User findByUsername(String username);
    User save(User user);
    User getById(Long id);
    User getBy(String username);
}
