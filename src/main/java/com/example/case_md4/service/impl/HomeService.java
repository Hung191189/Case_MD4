package com.example.case_md4.service.impl;

import com.example.case_md4.model.Home;
import com.example.case_md4.model.Status;
import com.example.case_md4.repository.IHomeRepository;
import com.example.case_md4.service.IHomeService;
import com.example.case_md4.service.IStatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class HomeService implements IHomeService {
    @Autowired
    IHomeRepository homeRepository;
    @Autowired
    IStatusService statusService;
    @Override
    public Iterable<Home> findAll() {
        return homeRepository.findAll();
    }

    public Iterable<Home> findAllByStatus12() {
        return homeRepository.findByStatusIsNot(3);
    }
    public Iterable<Home> findAllByNameContaining(String name) {
        return homeRepository.findAllByNameContaining(name);
    }
    public Iterable<Home> findAllByProvince(String province) {
        return homeRepository.findAllByProvince(province);
    }
    public Iterable<Home> findAllByPriceBetween(double min, double max) {
        return homeRepository.findAllByPriceBetween(min, max);
    }


    @Override
    public Optional<Home> findById(Long id) {
        return homeRepository.findById(id);
    }

    @Override
    public Home save(Home home) {
        homeRepository.save(home);
        return home;
    }

    @Override
    public void delete(Long id) {
        homeRepository.deleteById(id);
    }
}
