package com.lucyzhang.surfboardrental.entity;


import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "equipment")
public class Equipment {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String category;
    private BigDecimal dailyRate;
    private String imageUrl;
    private String description;
    private int stockQuantity;
    private String skillLevel;//(Beginner, Intermediate, Pro)
    private String conditionStatus;//(Available, Maintenance, Rented)
    @OneToMany(mappedBy = "equipment", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Rental> rentals = new ArrayList<>();


    @Override
    public String toString() {
        return "Equipment{" +
                "id=" + id +
                ", equipmentType='" + category + '\'' +
                ", price=" + dailyRate +
                ", photoUrl='" + imageUrl + '\'' +
                ", description='" + description + '\'' +
                '}';
    }
}
