package com.example.case_md4.controller;

import com.example.case_md4.model.Home;
import com.example.case_md4.model.Image;
import com.example.case_md4.service.IHomeService;
import com.example.case_md4.service.impl.HomeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin("*")
@RestController
@RequestMapping("/homes")
public class HomeController {
    @Autowired
    IHomeService iHomeService;
    @Autowired
    HomeService homeService;

    @GetMapping
    public ResponseEntity<Iterable<Home>> showAllHome() {
        List<Home> homeList = (List<Home>) iHomeService.findAll();
        if (homeList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(homeList, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Home> findHomeById(@PathVariable Long id) {
        Optional<Home> homeOptional = iHomeService.findById(id);
        if (!homeOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(homeOptional.get(), HttpStatus.OK);
    }

    @GetMapping("/findByName/{name}")
    public ResponseEntity<Iterable<Home>> findAllByNameContaining(@PathVariable String name) {
        List<Home> homeIterable = (List<Home>) homeService.findAllByNameContaining(name);
        if (homeIterable.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(homeIterable, HttpStatus.OK);
    }

    @GetMapping("/findByPrice")
    public ResponseEntity<Iterable<Home>> findAllByPriceBetween(@RequestBody double[] range) {

        List<Home> homeIterable = (List<Home>) homeService.findAllByPriceBetween(range[0], range[1]);
        if (homeIterable.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(homeIterable, HttpStatus.OK);
    }

    @GetMapping("/findByProvince/{province}")
    public ResponseEntity<Iterable<Home>> findAllByProvince(@PathVariable String province) {

        List<Home> homeIterable = (List<Home>) homeService.findAllByProvince(province);
        if (homeIterable.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(homeIterable, HttpStatus.OK);
    }

    @PostMapping("")
    public ResponseEntity<Home> saveHome(@RequestBody Home home) {
        iHomeService.save(home);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Home> updateHome(@PathVariable Long id, @RequestBody Home home) {
        Optional<Home> homeOptional = iHomeService.findById(id);
        if (!homeOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        home.setId(id);
        iHomeService.save(home);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Home> deleteHome(@PathVariable Long id) {
        Optional<Home> homeOptional = iHomeService.findById(id);
        if (!homeOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        homeOptional.get().setStatus(3);
        iHomeService.save(homeOptional.get());
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @GetMapping("/findValid")
    public ResponseEntity<Iterable<Home>> findAllByStatus12() {
        List<Home> homeList = (List<Home>) ((HomeService) iHomeService).findAllByStatus12();
        if (homeList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(homeList, HttpStatus.OK);
    }

}
