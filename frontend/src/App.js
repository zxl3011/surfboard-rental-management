

// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './component/common/Navbar';
import FooterComponent from './component/common/Footer';
import LoginPage from './component/auth/LoginPage';
import RegisterPage from './component/auth/RegisterPage';
import HomePage from './component/home/HomePage';
import AllEquipmentsPage from './component/equipment_rental/AllEquipmentsPage';
import EquipmentDetailsRentalPage from './component/equipment_rental/EquipmentDetailsPage';
import FindRentalPage from './component/equipment_rental/FindRentalPage';
import AdminPage from './component/admin/AdminPage';
import ManageEquipmentPage from './component/admin/ManageEquipmentPage';
import EditEquipmentPage from './component/admin/EditEquipmentPage';
import AddEquipmentPage from './component/admin/AddEquipmentPage';
import ManageRentalsPage from './component/admin/ManageRentalsPage';
import EditRentalPage from './component/admin/EditRentalPage';
import ProfilePage from './component/profile/ProfilePage';
import EditProfilePage from './component/profile/EditProfilePage';
import { ProtectedRoute, AdminRoute } from './service/guard';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            {/* Public Routes */}
            <Route exact path="/home" element={<HomePage />} />
            <Route exact path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/equipments" element={<AllEquipmentsPage />} />
            <Route path="/find-rental" element={<FindRentalPage />} />

            {/* Protected Routes */}
            <Route path="/equipment-details-rent/:equipmentId"
              element={<ProtectedRoute element={<EquipmentDetailsRentalPage />} />}
            />
            <Route path="/profile"
              element={<ProtectedRoute element={<ProfilePage />} />}
            />
            <Route path="/edit-profile"
              element={<ProtectedRoute element={<EditProfilePage />} />}
            />

            {/* Admin Routes */}
            <Route path="/admin"
              element={<AdminRoute element={<AdminPage />} />}
            />
            <Route path="/admin/manage-equipments"
              element={<AdminRoute element={<ManageEquipmentPage />} />}
            />
            <Route path="/admin/edit-equipment/:equipmentId"
              element={<AdminRoute element={<EditEquipmentPage />} />}
            />
            <Route path="/admin/add-equipment"
              element={<AdminRoute element={<AddEquipmentPage />} />}
            />
            <Route path="/admin/manage-rentals"
              element={<AdminRoute element={<ManageRentalsPage />} />}
            />
            <Route path="/admin/edit-rental/:rentalCode"
              element={<AdminRoute element={<EditRentalPage />} />}
            />

            {/* Fallback Route */}
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </div>
        <FooterComponent />
      </div>
    </BrowserRouter>
  );
}

export default App;
