package com.lucyzhang.surfboardrental.utils;

import com.lucyzhang.surfboardrental.dto.EquipmentDTO;
import com.lucyzhang.surfboardrental.dto.RentalDTO;
import com.lucyzhang.surfboardrental.dto.UserDTO;
import com.lucyzhang.surfboardrental.entity.Rental;
import com.lucyzhang.surfboardrental.entity.Equipment;
import com.lucyzhang.surfboardrental.entity.User;

import java.security.SecureRandom;
import java.util.List;
import java.util.stream.Collectors;

public class Utils {

    private static final String ALPHANUMERIC_STRING = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    private static final SecureRandom secureRandom = new SecureRandom();


    public static String generateRandomConfirmationCode(int length) {
        StringBuilder stringBuilder = new StringBuilder();
        for (int i = 0; i < length; i++) {
            int randomIndex = secureRandom.nextInt(ALPHANUMERIC_STRING.length());
            char randomChar = ALPHANUMERIC_STRING.charAt(randomIndex);
            stringBuilder.append(randomChar);
        }
        return stringBuilder.toString();
    }


    public static UserDTO mapUserEntityToUserDTO(User user) {
        UserDTO userDTO = new UserDTO();

        userDTO.setId(user.getId());
        userDTO.setName(user.getName());
        userDTO.setEmail(user.getEmail());
        userDTO.setPhoneNumber(user.getPhoneNumber());
        userDTO.setRole(user.getRole());
        return userDTO;
    }

    public static EquipmentDTO mapEquipmentEntityToEquipmentDTO(Equipment equipment) {
        EquipmentDTO equipmentDTO = new EquipmentDTO();

        equipmentDTO.setId(equipment.getId());
        equipmentDTO.setCategory(equipment.getCategory());
        equipmentDTO.setDailyRate(equipment.getDailyRate());
        equipmentDTO.setImageUrl(equipment.getImageUrl());
        equipmentDTO.setDescription(equipment.getDescription());
        equipmentDTO.setStockQuantity(equipment.getStockQuantity());
        equipmentDTO.setSkillLevel(equipment.getSkillLevel());
        equipmentDTO.setConditionStatus(equipment.getConditionStatus());
        return equipmentDTO;
    }

    public static RentalDTO mapRentalEntityToRentalDTO(Rental rental) {
        RentalDTO rentalDTO = new RentalDTO();
        // Map simple fields
        rentalDTO.setId(rental.getId());
        rentalDTO.setStartDate(rental.getStartDate());
        rentalDTO.setEndDate(rental.getEndDate());
        rentalDTO.setRentalConfirmationCode(rental.getRentalConfirmationCode());
        rentalDTO.setQuantity(rental.getQuantity());
        return rentalDTO;
    }

    public static EquipmentDTO mapEquipmentEntityToEquipmentDTOPlusRentals(Equipment equipment) {
        EquipmentDTO equipmentDTO = new EquipmentDTO();

        equipmentDTO.setId(equipment.getId());
        equipmentDTO.setCategory(equipment.getCategory());
        equipmentDTO.setDailyRate(equipment.getDailyRate());
        equipmentDTO.setImageUrl(equipment.getImageUrl());
        equipmentDTO.setDescription(equipment.getDescription());

        if (equipment.getRentals() != null) {
            equipmentDTO.setRental(equipment.getRentals().stream().map(Utils::mapRentalEntityToRentalDTO).collect(Collectors.toList()));
        }
        return equipmentDTO;
    }

    public static RentalDTO mapRentalEntityToRentalDTOPlusBookedEquipments(Rental rental, boolean mapUser) {

        RentalDTO RentalDTO = new RentalDTO();
        // Map simple fields
        RentalDTO.setId(rental.getId());
        RentalDTO.setStartDate(rental.getStartDate());
        RentalDTO.setEndDate(rental.getEndDate());
        RentalDTO.setRentalConfirmationCode(rental.getRentalConfirmationCode());
        RentalDTO.setQuantity(rental.getQuantity());
        if (mapUser) {
            RentalDTO.setUser(Utils.mapUserEntityToUserDTO(rental.getUser()));
        }
        if (rental.getEquipment() != null) {
            EquipmentDTO equipmentDTO = new EquipmentDTO();

            equipmentDTO.setId(rental.getEquipment().getId());
            equipmentDTO.setCategory(rental.getEquipment().getCategory());
            equipmentDTO.setDailyRate(rental.getEquipment().getDailyRate());
            equipmentDTO.setImageUrl(rental.getEquipment().getImageUrl());
            equipmentDTO.setDescription(rental.getEquipment().getDescription());
            RentalDTO.setEquipment(equipmentDTO);
        }
        return RentalDTO;
    }

    public static UserDTO mapUserEntityToUserDTOPlusUserRentalsAndEquipment(User user) {
        UserDTO userDTO = new UserDTO();

        userDTO.setId(user.getId());
        userDTO.setName(user.getName());
        userDTO.setEmail(user.getEmail());
        userDTO.setPhoneNumber(user.getPhoneNumber());
        userDTO.setRole(user.getRole());

        if (!user.getRentals().isEmpty()) {
            userDTO.setRentals(user.getRentals().stream().map(rental -> mapRentalEntityToRentalDTOPlusBookedEquipments(rental, false)).collect(Collectors.toList()));
        }
        return userDTO;
    }


    public static List<UserDTO> mapUserListEntityToUserListDTO(List<User> userList) {
        return userList.stream().map(Utils::mapUserEntityToUserDTO).collect(Collectors.toList());
    }

    public static List<EquipmentDTO> mapEquipmentListEntityToEquipmentListDTO(List<Equipment> equipmentList) {
        return equipmentList.stream().map(Utils::mapEquipmentEntityToEquipmentDTO).collect(Collectors.toList());
    }

    public static List<RentalDTO> mapRentalListEntityToRentalListDTO(List<Rental> rentalList) {
        return rentalList.stream().map(Utils::mapRentalEntityToRentalDTO).collect(Collectors.toList());
    }


}


