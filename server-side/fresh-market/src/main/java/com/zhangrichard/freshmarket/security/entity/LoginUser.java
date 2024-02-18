package com.zhangrichard.freshmarket.security.entity;

import lombok.Data;

@Data
public class LoginUser {

    private String id;

    private String loginName;

    private String password;
    private String salt;
}