package com.example.case_md4.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Data
@AllArgsConstructor
@RequiredArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private int age;
    private String sex;
    private String address;
    private String email;
    private String password;
    private String phone;
    private String image;
    @JoinTable(name = "user_role",
            joinColumns = @JoinColumn(name = "id_user"),
            inverseJoinColumns = @JoinColumn(name = "id_role"))
    @ManyToMany(fetch = FetchType.LAZY)
    private Set<Role> advertisementSet = new HashSet<>();
    @Column(nullable = false)
    private String confirmPassword;
    private boolean enabled = true;

}
