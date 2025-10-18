package com.ecommerce.foodies.service;

import com.ecommerce.foodies.io.UserRequest;
import com.ecommerce.foodies.io.UserResponse;
import org.springframework.stereotype.Service;


public interface UserService {

    UserResponse registerUser(UserRequest request);

    String findByUserId();
}
