package com.ecommerce.foodies.io;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderResponse {

    private String id;
    private String userId;
    private String userAddress;
    private String phoneNumber;
    private String email;

    private double amount;
    private List<OrderItem> orderedItems;
    private String paymentStatus;
    private String razorpayOrderId;

    private String orderStatus;
}
