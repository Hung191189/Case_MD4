package com.example.case_md4.service;

import com.example.case_md4.model.Bill;

import java.time.LocalDate;

public interface IBillService extends IGeneralService<Bill> {
    Iterable<Bill> findAllByUserId(Long id);
    Iterable<Bill> findAllByHomeId(Long id);
    Iterable<Bill> findAllByDateOfHire(LocalDate date);
}
