package com.example.case_md4.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

@Entity
@Data
@AllArgsConstructor
@RequiredArgsConstructor
public class User implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private int age;
    private String sex;
    private String address;
    private String userName;
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

    public User(String userName, String password) {
        this.userName = userName;
        this.password = password;
    }

    public User(Long id, String password, String confirmPassword) {
        this.id = id;
        this.password = password;
        this.confirmPassword = confirmPassword;
    }

    public String getConfirmPassword() {
        return confirmPassword;
    }
    public boolean isEnabled() {
        return enabled;
    }
    public Set<Role> getRoles() {
        return advertisementSet;
    }


    public void setRoles(Set<Role> roles) {
        this.advertisementSet = roles;
    }
}
