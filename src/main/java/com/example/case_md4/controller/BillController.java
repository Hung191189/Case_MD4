package com.example.case_md4.controller;

import com.example.case_md4.model.Bill;
import com.example.case_md4.service.IBillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/bills")
public class BillController {
    @Autowired
    IBillService billService;
    @GetMapping
    ResponseEntity<Iterable<Bill>> findAll() {
        List<Bill> bills = (List<Bill>) billService.findAll();
        if (bills.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(bills, HttpStatus.OK);
    }
    @PostMapping
    ResponseEntity<Bill> save(@RequestBody Bill bill) {
        billService.save(bill);
        return new ResponseEntity<>(bill, HttpStatus.CREATED);
    }
    @GetMapping("/findByUser")
    ResponseEntity<Iterable<Bill>> findAllByUserId(@RequestBody Long id) {
        List<Bill> bills = (List<Bill>) billService.findAllByUserId(id);
        if (bills.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(bills, HttpStatus.OK);
    }
    @GetMapping("/findByHome")
    ResponseEntity<Iterable<Bill>> findAllByHomeId(@RequestBody Long id) {
        List<Bill> bills = (List<Bill>) billService.findAllByHomeId(id);
        if (bills.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(bills, HttpStatus.OK);
    }
    @GetMapping("/findByDate")
    ResponseEntity<Iterable<Bill>> findAllByDateOfHire(@RequestBody LocalDate date) {
        List<Bill> bills = (List<Bill>) billService.findAllByDateOfHire(date);
        if (bills.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(bills, HttpStatus.OK);
    }
}
