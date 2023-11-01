package com.example.case_md4.service.impl;

import com.example.case_md4.model.Bill;
import com.example.case_md4.repository.IBillRepository;
import com.example.case_md4.service.IBillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
@Service
public class BillService implements IBillService {
    @Autowired
    IBillRepository iBillRepository;
    @Override
    public Iterable<Bill> findAll() {
        return iBillRepository.findAll();
    }

    @Override
    public Optional<Bill> findById(Long id) {
        return iBillRepository.findById(id);
    }


    @Override
    public Bill save(Bill bill) {
        return iBillRepository.save(bill);
    }

    @Override
    public void delete(Long id) {

    }
}
