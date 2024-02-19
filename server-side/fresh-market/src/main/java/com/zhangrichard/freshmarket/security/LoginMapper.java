package com.zhangrichard.freshmarket.security;

import com.zhangrichard.freshmarket.security.entity.LoginUser;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface LoginMapper {

    @Select("SELECT id, loginName, " +
            "password, salt FROM user " +
            "WHERE loginName = #{loginName} ")
    LoginUser getUserByLoginName(String loginName);
}