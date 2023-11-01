package com.example.case_md4.service.impl;

import com.example.case_md4.model.Status;
import com.example.case_md4.repository.IStatusRepository;
import com.example.case_md4.service.IStatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
@Service
public class StatusService implements IStatusService {
    @Autowired
    IStatusRepository iStatusRepository;
    @Override
    public Iterable<Status> findAll() {
        return iStatusRepository.findAll();
    }

//    private Optional<Status> findByStatus(int status) {
//        return iStatusRepository.findByStatusIsNot(status);
//    }

    @Override
    public Optional<Status> findById(Long id) {
        return iStatusRepository.findById(id);
    }

    @Override
    public Status save(Status status) {
        iStatusRepository.save(status);
        return status;
    }

    @Override
    public void delete(Long id) {
        iStatusRepository.deleteById(id);
    }
}
