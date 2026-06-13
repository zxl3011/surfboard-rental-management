package com.lucyzhang.surfboardrental.repo;

import com.lucyzhang.surfboardrental.entity.Rental;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RentalRepository extends JpaRepository<Rental, Long> {

    Optional<Rental> findByRentalConfirmationCode(String confirmationCode);
}
