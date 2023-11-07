package com.example.case_md4.service.impl;

import com.example.case_md4.model.User;
import com.example.case_md4.model.UserPrinciple;
import com.example.case_md4.repository.IUserRepository;

import com.example.case_md4.service.IUserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class UserService implements IUserService {

    @Autowired
    private IUserRepository userRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) {
        User user = userRepository.findByUserName(username);
        if (user == null) {
            throw new UsernameNotFoundException(username);
        }
        if (this.checkLogin(user)) {
            return UserPrinciple.build(user);
        }
        boolean enable = false;
        boolean accountNonExpired = false;
        boolean credentialsNonExpired = false;
        boolean accountNonLocked = false;
        return new org.springframework.security.core.userdetails.User(user.getUserName(),
                user.getPassword(), enable, accountNonExpired, credentialsNonExpired,
                accountNonLocked, null);
    }


    @Override
    public void save(User user) {
        userRepository.save(user);
    }

    @Override
    public Iterable<User> findAll() {
        return userRepository.findAll();
    }

    @Override
    public User findByUsername(String username) {
        return userRepository.findByUserName(username);
    }

    @Override
    public User getCurrentUser() {
        User user;
        String userName;
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (principal instanceof UserDetails) {
            userName = ((UserDetails) principal).getUsername();
        } else {
            userName = principal.toString();
        }
        user = this.findByUsername(userName);
        return user;
    }

    @Override
    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    @Override
    public UserDetails loadUserById(Long id) {
        Optional<User> user = userRepository.findById(id);
        if (!user.isPresent()) {
            throw new NullPointerException();
        }
        return UserPrinciple.build(user.get());
    }

    @Override
    public boolean checkLogin(User user) {
        Iterable<User> users = this.findAll();
        boolean isCorrectUser = false;
        for (User currentUser : users) {
            if (currentUser.getUserName().equals(user.getUserName())
                    && user.getPassword().equals(currentUser.getPassword()) &&
                    currentUser.isEnabled()) {
                isCorrectUser = true;
            }
        }
        return isCorrectUser;
    }

    @Override
    public boolean isRegister(User user) {
        boolean isRegister = false;
        Iterable<User> users = this.findAll();
        for (User currentUser : users) {
            if (user.getUserName().equals(currentUser.getUserName())) {
                isRegister = true;
                break;
            }
        }
        return isRegister;
    }

    @Override
    public boolean isCorrectConfirmPassword(User user) {
        boolean isCorrentConfirmPassword = false;
        if (user.getPassword().equals(user.getConfirmPassword())) {
            isCorrentConfirmPassword = true;
        }
        return isCorrentConfirmPassword;
    }

    @Override
    public void delete(Long id) {
        userRepository.deleteById(id);
    }

    public User updateUser(User user_new) {
        User user = findById(user_new.getId()).get();
        if (user_new.getAddress().isEmpty()) {
            user_new.setAddress(user.getAddress());
        }
        if (user_new.getAge() == 0) {
            user_new.setAge(user.getAge());
        }
        if (user_new.getSex().isEmpty()) {
            user_new.setSex(user.getSex());
        }
        if (user_new.getPhone().isEmpty()) {
            user_new.setPhone(user.getPhone());
        }
        if (user_new.getImage().isEmpty()) {
            user_new.setImage(user.getImage());
        }
        if (user_new.getAdvertisementSet().isEmpty()) {
            user_new.setAdvertisementSet(user.getAdvertisementSet());
        }
        if (user_new.getConfirmPassword().isEmpty()) {
            user_new.setConfirmPassword(user.getConfirmPassword());
        }
        if (user_new.getPassword().isEmpty()) {
            user_new.setPassword(user.getPassword());
        }
        if (user.getUserName().isEmpty()) {
            user_new.setUserName(user.getUserName());
        }
        return user_new;
    }
}
