package com.ecommerce.foodies.service;


import com.ecommerce.foodies.io.CartRequest;
import com.ecommerce.foodies.io.CartResponse;

public interface CartService {

    CartResponse addToCart(CartRequest request);

    CartResponse getCart();

    void clearCart();

    CartResponse removeFromCart(CartRequest request);
}
