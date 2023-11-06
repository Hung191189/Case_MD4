package com.example.case_md4.service;

import com.example.case_md4.model.Image;
import org.springframework.data.jpa.repository.Query;

public interface IImageService extends IGeneralService<Image> {
    @Query(value = "select * from image where id_home = ?", nativeQuery = true)
    Image findOneImage(Long id);
}
