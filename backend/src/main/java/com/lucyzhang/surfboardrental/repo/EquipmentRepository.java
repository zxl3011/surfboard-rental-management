package com.lucyzhang.surfboardrental.repo;

import com.lucyzhang.surfboardrental.entity.Equipment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;

public interface EquipmentRepository extends JpaRepository<Equipment, Long> {

    @Query("SELECT DISTINCT r.category FROM Equipment r")
    List<String> findDistinctCategories();


    @Query("SELECT r FROM Equipment r WHERE r.category LIKE %:category% AND r.id NOT IN (SELECT bk.equipment.id FROM Rental bk WHERE" +
            "(bk.startDate <= :endDate) AND (bk.endDate >= :startDate))")
    List<Equipment> findAvailableEquipmentsByDatesAndTypes(LocalDate startDate, LocalDate endDate, String category);


    @Query("SELECT r FROM Equipment r WHERE r.id NOT IN (SELECT b.equipment.id FROM Rental b)")
    List<Equipment> getAllAvailableEquipments();
}
