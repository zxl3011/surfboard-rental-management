package com.lucyzhang.surfboardrental.service.interfac;

import com.lucyzhang.surfboardrental.dto.LoginRequest;
import com.lucyzhang.surfboardrental.dto.Response;
import com.lucyzhang.surfboardrental.entity.User;

public interface IUserService {
    Response register(User user);

    Response login(LoginRequest loginRequest);

    Response getAllUsers();

    Response getUserRentalHistory(String userId);

    Response deleteUser(String userId);

    Response getUserById(String userId);

    Response getMyInfo(String email);

}
