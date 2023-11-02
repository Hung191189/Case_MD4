package com.example.case_md4.service;

import com.example.case_md4.model.Role;

import java.util.Optional;

public interface IRoleService extends IGeneralService<Role>{
   Role findByName(String name);
}
