package com.wp.bookstore.Service.impl;

import com.wp.bookstore.Models.UserRole;
import com.wp.bookstore.Repository.UserRoleRepository;
import com.wp.bookstore.Service.UserRoleService;
import org.springframework.stereotype.Service;

@Service
public class UserRoleImpl implements UserRoleService {
    private UserRoleRepository userRoleRepository;

    public UserRoleImpl(UserRoleRepository userRoleRepository) {
        this.userRoleRepository = userRoleRepository;
    }

    @Override
    public UserRole findByName(String user) {
        return userRoleRepository.getByName(user);
    }
}
