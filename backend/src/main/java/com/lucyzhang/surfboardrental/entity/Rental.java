package com.lucyzhang.surfboardrental.entity;


import jakarta.persistence.*;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;

@Data
@Entity
@Table(name = "rentals")
public class Rental {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "rental start date is required")
    private LocalDate startDate;

    @Future(message = "rental end date must be in the future")
    private LocalDate endDate;

    private String rentalConfirmationCode;

    @Min(value = 1, message = "Quantity must be at least 1")
    private int quantity = 1; //default 1

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "equipment_id")
    private Equipment equipment;


    @Override
    public String toString() {
        return "Rental{" +
                "id=" + id +
                ", startDate=" + startDate +
                ", endDate=" + endDate +
                ", rentalConfirmationCode='" + rentalConfirmationCode + '\'' +
                ", quantity=" + quantity +
                '}';
    }
}
