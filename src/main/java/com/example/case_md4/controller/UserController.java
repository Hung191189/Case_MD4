package com.example.case_md4.controller;

import com.example.case_md4.model.JwtResponse;
import com.example.case_md4.model.Role;
import com.example.case_md4.model.User;
import com.example.case_md4.service.IRoleService;
import com.example.case_md4.service.impl.JwtService;
import com.example.case_md4.service.impl.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.Set;
@RestController
@CrossOrigin("*")
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private UserService userService;
    @Autowired
    private IRoleService roleService;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @PostMapping("/register")
    public ResponseEntity<User> createUser(@RequestBody User user, BindingResult bindingResult) {

        if (bindingResult.hasFieldErrors()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        Iterable<User> users = userService.findAll();
        for (User currentUser : users) {
            if (currentUser.getUserName().equals(user.getUserName())) {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        }
        if (!userService.isCorrectConfirmPassword(user)) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        if (user.getRoles().equals(null) || user.getRoles().equals(2L)) {
            Role role = roleService.findById(2L).get();
            Set<Role> roles = new HashSet<>();
            roles.add(role);
            user.setRoles(roles);
        } else if (user.getRoles().equals(3L)){
            System.out.println(roleService.findById(3L));
            Role role1 = roleService.findById(3L).get();
            Set<Role> roles1 = new HashSet<>();
            roles1.add(role1);
            user.setRoles(roles1);
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setConfirmPassword(passwordEncoder.encode(user.getConfirmPassword()));
        userService.save(user);
        return new ResponseEntity<>(user, HttpStatus.CREATED);
    }
    @GetMapping("/update/{id_user}")
    public ResponseEntity<User> update(@PathVariable("id_user")Long id_user){
        return new ResponseEntity<>(userService.findById(id_user).get(), HttpStatus.OK);
    }
    @PutMapping
    public ResponseEntity<?> put(@RequestBody User user_new){
        userService.updateUser(user_new);
        user_new.setPassword(passwordEncoder.encode(user_new.getPassword()));
        user_new.setConfirmPassword(passwordEncoder.encode(user_new.getConfirmPassword()));
        userService.save(user_new);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user){
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(user.getUserName(), user.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = jwtService.generateTokenLogin(authentication);
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        User currentUser = userService.findByUsername(user.getUserName());
        return ResponseEntity.ok(new JwtResponse(jwt, currentUser.getId(), userDetails.getUsername(), userDetails.getAuthorities()));
    }
    @GetMapping
    private ResponseEntity<Iterable<User>> showList(){
        return new ResponseEntity<>(userService.findAll(), HttpStatus.OK);
    }
    @GetMapping("/{id}")
    public ResponseEntity<User> findById(@PathVariable("id")Long id_user){
        return new ResponseEntity<>(userService.findById(id_user).get(), HttpStatus.OK);
    }
    @PutMapping("/true_false/{id}")
    public ResponseEntity<?> delete(@PathVariable("id")Long id_user){
        User user = userService.findById(id_user).get();
        user.setEnabled(false);
        userService.save(user);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @PutMapping("/false_true/{id}")
    public ResponseEntity<?> updateEnable(@PathVariable("id") Long id_user){
        User user = userService.findById(id_user).get();
        user.setEnabled(true);
        userService.save(user);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
