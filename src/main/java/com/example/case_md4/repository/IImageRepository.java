package com.example.case_md4.repository;

import com.example.case_md4.model.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface IImageRepository extends JpaRepository<Image, Long> {
    @Query(value = "select * from image where id_home = ?", nativeQuery = true)
    Image findOneImage(Long id);
}
