package com.example.case_md4.service.impl;

import com.example.case_md4.model.Image;
import com.example.case_md4.repository.IImageRepository;
import com.example.case_md4.service.IImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;
@Service
public class ImageService implements IImageService {
    @Autowired
    IImageRepository iImageRepository;

    @Override
    public Iterable<Image> findAll() {
        return iImageRepository.findAll();
    }

    @Override
    public Optional<Image> findById(Long id) {
        return iImageRepository.findById(id);
    }

    @Override
    public Image save(Image image) {
        iImageRepository.save(image);
        return image;
    }

    @Override
    public void delete(Long id) {
        iImageRepository.deleteById(id);
    }
}
