package com.ecommerce.foodies.service;

import com.ecommerce.foodies.io.FoodRequest;
import com.ecommerce.foodies.io.FoodResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface FoodService {

    String uploadFile(MultipartFile file);

    FoodResponse addFood(FoodRequest request, MultipartFile file);

    List<FoodResponse> readFoods();

    FoodResponse readFood(String id);

    Boolean deleteFile(String filename);

    void deleteFood(String id);
}
