package com.ecommerce.foodies.controller;

import com.ecommerce.foodies.io.OrderRequest;
import com.ecommerce.foodies.io.OrderResponse;
import com.ecommerce.foodies.service.OrderService;
import com.razorpay.RazorpayException;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/orders")
@AllArgsConstructor
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    public OrderResponse createOrderWithPayment(@RequestBody OrderRequest request) throws RazorpayException {
        OrderResponse response = orderService.createOrderWithPayment(request);
        return response;
    }

    @PostMapping("/verify")
    public void verifyPayment(@RequestBody Map<String, String> paymentData){
        orderService.verifyPayment(paymentData, "paid");
    }

    @GetMapping
    public List<OrderResponse> getOrders(){
        return orderService.getUserOrders();
    }

    @DeleteMapping("/delete/{orderId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteOrder(@PathVariable String orderId){
        orderService.removeOrder(orderId);
    }

    // Admin Panel
    @GetMapping("/all")
    public List<OrderResponse> getAllOrders(){
        return orderService.getOrdersOfAllUsers();
    }

    // Admin Panel
    @PatchMapping("/status/{orderId}")
    public void updateOrderStatus(@PathVariable String orderId, @RequestParam String status){
        orderService.updateOrderStatus(orderId, status);
    }
}
