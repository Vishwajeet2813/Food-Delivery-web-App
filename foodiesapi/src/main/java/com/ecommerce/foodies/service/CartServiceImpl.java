package com.ecommerce.foodies.service;

import com.ecommerce.foodies.entity.CartEntity;
import com.ecommerce.foodies.io.CartRequest;
import com.ecommerce.foodies.io.CartResponse;
import com.ecommerce.foodies.repository.CartRepository;
import lombok.AllArgsConstructor;
import lombok.Builder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
@AllArgsConstructor
public class CartServiceImpl implements CartService{

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private UserService userService;

    @Override
    public CartResponse addToCart(CartRequest request) {
        String loggedInUserId = userService.findByUserId();
        Optional<CartEntity> cartOptional = cartRepository.findByUserId(loggedInUserId);
        CartEntity cart = cartOptional.orElseGet(() -> new CartEntity(loggedInUserId, new HashMap<>()));
        Map<String, Integer> cartItems = cart.getItems();
        cartItems.put(request.getFoodId(), cartItems.getOrDefault(request.getFoodId(), 0) + 1);
        cart.setItems(cartItems);
        cart = cartRepository.save(cart);
        return convertToResponse(cart);
    }

    @Override
    public CartResponse getCart() {
        String loggedInUserId = userService.findByUserId();
        CartEntity entity = cartRepository.findByUserId(loggedInUserId)
                .orElse(new CartEntity(null, loggedInUserId, new HashMap<>()));
        return convertToResponse(entity);
    }

    @Override
    public void clearCart() {
        String loggedInUserId = userService.findByUserId();
        cartRepository.deleteByUserId(loggedInUserId);
    }

    @Override
    public CartResponse removeFromCart(CartRequest request) {
        String loggedInUserId = userService.findByUserId();
        CartEntity cartEntity = cartRepository.findByUserId(loggedInUserId)
                .orElseThrow(() -> new RuntimeException("Cart is not found!!!"));
        Map<String, Integer> cartItems = cartEntity.getItems();
        if(cartItems.containsKey(request.getFoodId())){
            int currQuantity = cartItems.get(request.getFoodId());
            if(currQuantity > 0){
                cartItems.put(request.getFoodId(), currQuantity - 1);
            }
            else {
                cartItems.remove(request.getFoodId());
            }
            cartEntity = cartRepository.save(cartEntity);
        }

        return convertToResponse(cartEntity);
    }

    private CartResponse convertToResponse(CartEntity cartEntity){
        return CartResponse.builder()
                .id(cartEntity.getId()).userId(cartEntity.getUserId()).items(cartEntity.getItems()).build();
    }
}
