package com.lucyzhang.surfboardrental.controller;


import com.lucyzhang.surfboardrental.dto.Response;
import com.lucyzhang.surfboardrental.entity.Rental;
import com.lucyzhang.surfboardrental.service.interfac.IRentalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/rentals")

public class RentalController {

    @Autowired
    private IRentalService rentalService;

    @PostMapping("/rental-equipment/{equipmentId}/{userId}")
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('USER')")
    public ResponseEntity<Response> saveRentals(@PathVariable Long equipmentId,
                                                 @PathVariable Long userId,
                                                 @RequestBody Rental rentalRequest) {


        Response response = rentalService.saveRental(equipmentId, userId, rentalRequest);
        return ResponseEntity.status(response.getStatusCode()).body(response);

    }

    @GetMapping("/all")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Response> getAllrentals() {
        Response response = rentalService.getAllRentals();
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @GetMapping("/get-by-confirmation-code/{confirmationCode}")
    public ResponseEntity<Response> getrentalByConfirmationCode(@PathVariable String confirmationCode) {
        Response response = rentalService.findRentalByConfirmationCode(confirmationCode);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @DeleteMapping("/cancel/{rentalId}")
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('USER')")
    public ResponseEntity<Response> cancelrental(@PathVariable Long rentalId) {
        Response response = rentalService.cancelRental(rentalId);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }


}
