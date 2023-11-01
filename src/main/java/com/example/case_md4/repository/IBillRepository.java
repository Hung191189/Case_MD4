package com.example.case_md4.repository;

import com.example.case_md4.model.Bill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;

@Repository
public interface IBillRepository extends JpaRepository<Bill, Long> {
    Iterable<Bill> findAllByUserId(Long id);
    Iterable<Bill> findAllByHomeId(Long id);
    Iterable<Bill> findAllByDateOfHire(LocalDate date);
}