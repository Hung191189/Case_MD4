package com.example.case_md4.repository;

import com.example.case_md4.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface IUserRepository extends JpaRepository<User, Long> {
    User findByUserName(String username);
    @Query(value = "update user set enable = false where id = ?", nativeQuery = true)
    void updateEnable_1(Long id);
    @Query(value = "update user set enable = true where id = ?", nativeQuery = true)
    void updateEnable_2(Long id);
}
