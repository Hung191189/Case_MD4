package com.example.case_md4.controller;

import com.example.case_md4.model.Bill;
import com.example.case_md4.model.HistoryBill;
import com.example.case_md4.service.IBillService;
import com.example.case_md4.service.IHistoryBillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/historybills")
public class HistoryBillController {
    @Autowired
    IHistoryBillService historyBillService;
    GetMapping
    ResponseEntity<Iterable<HistoryBill>> findAll() {
        List<HistoryBill> historyBills = (List<HistoryBill>) historyBillService.findAll();
        if (historyBills.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(historyBills, HttpStatus.OK);
    }
}
