package com.wp.bookstore.Service.impl;
import com.wp.bookstore.Models.User;
import com.wp.bookstore.Repository.UserRepository;
import com.wp.bookstore.Service.UserService;

import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {


    private UserRepository repo;

    public UserServiceImpl(UserRepository repo) {
        this.repo = repo;
    }

    @Override
    public User findByUsername(String username) {
        return repo.findByUsername(username);
    }

    @Override
    public User save(User user) {
        return repo.save(user);
    }

    @Override
    public User getById(Long id) {
        return repo.getById(id);
    }

    @Override
    public User getBy(String username) {
        return repo.findByUsername(username);
    }


}
