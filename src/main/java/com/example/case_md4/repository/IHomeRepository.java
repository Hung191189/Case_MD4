package com.example.case_md4.repository;

import com.example.case_md4.model.Home;
import com.example.case_md4.model.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface IHomeRepository extends JpaRepository<Home, Long> {
    Iterable<Home> findByStatusIsNot(int status);
    Iterable<Home> findAllByNameContaining(String name);
    Iterable<Home> findAllByProvince(String province);

    Iterable<Home> findAllByPriceBetween(double min, double max);
}
