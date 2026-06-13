package com.lucyzhang.surfboardrental.dto;


import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Response {

    private int statusCode;
    private String message;

    private String token;
    private String role;
    private String expirationTime;
    private String rentalConfirmationCode;

    private UserDTO user;
    private EquipmentDTO equipment;
    private RentalDTO rental;
    private List<UserDTO> userList;
    private List<EquipmentDTO> equipmentList;
    private List<RentalDTO> rentalList;


}
