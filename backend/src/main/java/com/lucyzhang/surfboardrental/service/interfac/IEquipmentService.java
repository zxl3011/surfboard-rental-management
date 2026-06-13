package com.lucyzhang.surfboardrental.service.interfac;

import com.lucyzhang.surfboardrental.dto.Response;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public interface IEquipmentService {

    Response addNewEquipment(MultipartFile photo, String equipmentType, BigDecimal equipmentPrice, String description);

    List<String> getAllCategories();

    Response getAllEquipments();

    Response deleteEquipment(Long equipmentId);

    Response updateEquipment(Long equipmentId, String description, String category, BigDecimal dailyRate, MultipartFile photo);

    Response getEquipmentById(Long equipmentId);

    Response getAvailableEquipmentsByDataAndType(LocalDate startDate, LocalDate endDate, String category);

    Response getAllAvailableEquipments();
}
