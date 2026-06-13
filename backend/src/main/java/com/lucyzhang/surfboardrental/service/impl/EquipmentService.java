package com.lucyzhang.surfboardrental.service.impl;

import com.lucyzhang.surfboardrental.dto.Response;
import com.lucyzhang.surfboardrental.dto.EquipmentDTO;
import com.lucyzhang.surfboardrental.entity.Equipment;
import com.lucyzhang.surfboardrental.exception.OurException;
import com.lucyzhang.surfboardrental.repo.RentalRepository;
import com.lucyzhang.surfboardrental.repo.EquipmentRepository;
import com.lucyzhang.surfboardrental.service.AwsS3Service;
import com.lucyzhang.surfboardrental.service.interfac.IEquipmentService;
import com.lucyzhang.surfboardrental.utils.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Service
public class EquipmentService implements IEquipmentService {


    @Autowired
    private EquipmentRepository equipmentRepository;
    @Autowired
    private RentalRepository rentalRepository;
    @Autowired
    private AwsS3Service awsS3Service;

    @Override
    public Response addNewEquipment(MultipartFile photo, String category, BigDecimal dailyRate, String description) {
        Response response = new Response();

        try {
            String imageUrl = awsS3Service.saveImageToS3(photo);
            Equipment equipment = new Equipment();
            equipment.setImageUrl(imageUrl);
            equipment.setCategory(category);
            equipment.setDailyRate(dailyRate);
            equipment.setDescription(description);
            Equipment savedEquipment = equipmentRepository.save(equipment);
            EquipmentDTO equipmentDTO = Utils.mapEquipmentEntityToEquipmentDTO(savedEquipment);
            response.setStatusCode(200);
            response.setMessage("successful");
            response.setEquipment(equipmentDTO);

        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error saving an equipment " + e.getMessage());
        }
        return response;
    }

    @Override
    public List<String> getAllCategories() {
        return equipmentRepository.findDistinctCategories();
    }

    @Override
    public Response getAllEquipments() {
        Response response = new Response();


        try {
            List<Equipment> equipmentList = equipmentRepository.findAll(Sort.by(Sort.Direction.DESC, "id"));
            List<EquipmentDTO> equipmentDTOList = Utils.mapEquipmentListEntityToEquipmentListDTO(equipmentList);
            response.setStatusCode(200);
            response.setMessage("successful");
            response.setEquipmentList(equipmentDTOList);

        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error saving an equipment " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response deleteEquipment(Long equipmentId) {
        Response response = new Response();

        try {
            equipmentRepository.findById(equipmentId).orElseThrow(() -> new OurException("Equipment Not Found"));
            equipmentRepository.deleteById(equipmentId);
            response.setStatusCode(200);
            response.setMessage("successful");

        } catch (OurException e) {
            response.setStatusCode(404);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error saving an equipment " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response updateEquipment(Long equipmentId, String description, String category, BigDecimal dailyRate, MultipartFile photo) {
        Response response = new Response();

        try {
            String imageUrl = null;
            if (photo != null && !photo.isEmpty()) {
                imageUrl = awsS3Service.saveImageToS3(photo);
            }
            Equipment equipment = equipmentRepository.findById(equipmentId).orElseThrow(() -> new OurException("Equipment Not Found"));
            if (category != null) equipment.setCategory(category);
            if (category != null) equipment.setDailyRate(dailyRate);
            if (description != null) equipment.setDescription(description);
            if (imageUrl != null) equipment.setImageUrl(imageUrl);

            Equipment updatedEquipment = equipmentRepository.save(equipment);
            EquipmentDTO equipmentDTO = Utils.mapEquipmentEntityToEquipmentDTO(updatedEquipment);

            response.setStatusCode(200);
            response.setMessage("successful");
            response.setEquipment(equipmentDTO);

        } catch (OurException e) {
            response.setStatusCode(404);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error saving an equipment " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response getEquipmentById(Long equipmentId) {
        Response response = new Response();

        try {
            Equipment equipment = equipmentRepository.findById(equipmentId).orElseThrow(() -> new OurException("Equipment Not Found"));
            EquipmentDTO equipmentDTO = Utils.mapEquipmentEntityToEquipmentDTOPlusRentals(equipment);
            response.setStatusCode(200);
            response.setMessage("successful");
            response.setEquipment(equipmentDTO);

        } catch (OurException e) {
            response.setStatusCode(404);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error saving an equipment " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response getAvailableEquipmentsByDataAndType(LocalDate startDate, LocalDate endDate, String category) {
        Response response = new Response();

        try {
            List<Equipment> availableEquipments = equipmentRepository.findAvailableEquipmentsByDatesAndTypes(startDate, endDate, category);
            List<EquipmentDTO> equipmentDTOList = Utils.mapEquipmentListEntityToEquipmentListDTO(availableEquipments);
            response.setStatusCode(200);
            response.setMessage("successful");
            response.setEquipmentList(equipmentDTOList);

        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error saving an equipment" + e.getMessage());
        }
        return response;
    }

    @Override
    public Response getAllAvailableEquipments() {
        Response response = new Response();

        try {
            List<Equipment> equipmentList = equipmentRepository.getAllAvailableEquipments();
            List<EquipmentDTO> equipmentDTOList = Utils.mapEquipmentListEntityToEquipmentListDTO(equipmentList);
            response.setStatusCode(200);
            response.setMessage("successful");
            response.setEquipmentList(equipmentDTOList);

        } catch (OurException e) {
            response.setStatusCode(404);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error saving an equipment" + e.getMessage());
        }
        return response;
    }
}
