package com.lucyzhang.surfboardrental.dto;


import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.time.LocalDate;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class RentalDTO {

    private Long id;
    private LocalDate startDate;
    private LocalDate endDate;

    private String rentalConfirmationCode;
    private Integer quantity;
    private UserDTO user;
    private EquipmentDTO equipment;
}
