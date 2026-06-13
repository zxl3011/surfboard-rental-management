package com.lucyzhang.surfboardrental.dto;


import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class EquipmentDTO {

    private Long id;
    private String category;
    private BigDecimal dailyRate;
    private String imageUrl;
    private String description;
    private int stockQuantity;
    private String skillLevel;
    private String conditionStatus;
    private List<RentalDTO> rental;
}
