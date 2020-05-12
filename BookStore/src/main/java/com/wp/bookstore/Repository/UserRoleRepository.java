package com.wp.bookstore.Repository;

import com.wp.bookstore.Models.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRoleRepository extends JpaRepository<UserRole,Long> {
    UserRole getByName(String name);
}
