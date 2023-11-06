package com.example.case_md4.service;

import com.example.case_md4.model.Image;
import org.springframework.data.jpa.repository.Query;

public interface IImageService extends IGeneralService<Image> {
   Image findOneImg(Long id_home);
}
