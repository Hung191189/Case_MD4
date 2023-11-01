package com.example.case_md4.repository;

import com.example.case_md4.model.User;
import org.springframework.stereotype.Repository;

@Repository
public interface IUserRepository {
    User findByUsername(String username);
}
