package com.example.case_md4.repository;

import com.example.case_md4.model.HistoryBill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IHistoryBillRepository extends JpaRepository<HistoryBill, Long> {
}
