package com.example.case_md4.service.impl;

import com.example.case_md4.model.HistoryBill;
import com.example.case_md4.repository.IHistoryBillRepository;
import com.example.case_md4.service.IHistoryBillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
@Service
public class HistoryBillService implements IHistoryBillService {
    @Autowired
    IHistoryBillRepository iHistoryBillRepository;
    @Override
    public Iterable<HistoryBill> findAll() {
        return iHistoryBillRepository.findAll();
    }

    @Override
    public Optional<HistoryBill> findById(Long id) {
        return iHistoryBillRepository.findById(id);
    }

    @Override
    public HistoryBill save(HistoryBill historyBill) {
        return iHistoryBillRepository.save(historyBill);
    }

    @Override
    public void delete(Long id) {
        iHistoryBillRepository.deleteById(id);
    }
}
