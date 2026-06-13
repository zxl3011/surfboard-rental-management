package com.lucyzhang.surfboardrental.service.interfac;

import com.lucyzhang.surfboardrental.dto.Response;
import com.lucyzhang.surfboardrental.entity.Rental;

public interface IRentalService {

    Response saveRental(Long equipmentId, Long userId, Rental rentalRequest);

    Response findRentalByConfirmationCode(String confirmationCode);

    Response getAllRentals();

    Response cancelRental(Long rentalId);

}
