package com.ecommerce.foodies.io;

import lombok.*;
import software.amazon.awssdk.services.s3.endpoints.internal.Value;

@Getter
@AllArgsConstructor
@Builder
public class AuthenticationResponse {

    private String email;
    private String token;
}
