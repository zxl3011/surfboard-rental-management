import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';
import Pagination from '../common/Pagination';

const ManageRentalsPage = () => {
    const [rentals, setRentals] = useState([]);
    const [filteredRentals, setFilteredRentals] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [rentalsPerPage] = useState(6);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRentals = async () => {
            try {
                const response = await ApiService.getAllRentals();
                const allRentals = response.rentalList;
                setRentals(allRentals);
                setFilteredRentals(allRentals);
            } catch (error) {
                console.error('Error fetching rentals:', error.message);
            }
        };

        fetchRentals();
    }, []);

    useEffect(() => {
        filterRentals(searchTerm);
    }, [searchTerm, rentals]);

    const filterRentals = (term) => {
        if (term === '') {
            setFilteredRentals(rentals);
        } else {
            const filtered = rentals.filter((rental) =>
                rental.rentalConfirmationCode && rental.rentalConfirmationCode.toLowerCase().includes(term.toLowerCase())
            );
            setFilteredRentals(filtered);
        }
        setCurrentPage(1);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const indexOfLastRental = currentPage * rentalsPerPage;
    const indexOfFirstRental = indexOfLastRental - rentalsPerPage;
    const currentRentals = filteredRentals.slice(indexOfFirstRental, indexOfLastRental);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className='rentals-container'>
            <h2>All Rentals</h2>
            <div className='search-div'>
                <label>Filter by Rental Number:</label>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="Enter rental number"
                />
            </div>

            <div className="rental-results">
                {currentRentals.map((rental) => (
                    <div key={rental.id} className="rental-result-item">
                        <p><strong>Rental Code:</strong> {rental.rentalConfirmationCode}</p>
                        <p><strong>Start Date:</strong> {rental.startDate}</p>
                        <p><strong>End Date:</strong> {rental.endDate}</p>
                        <button
                            className="edit-equipment-button"
                            onClick={() => navigate(`/admin/edit-rental/${rental.rentalConfirmationCode}`)}
                        >Manage Rental</button>
                    </div>
                ))}
            </div>

            <Pagination
                equipmentsPerPage={rentalsPerPage}
                totalEquipments={filteredRentals.length}
                currentPage={currentPage}
                paginate={paginate}
            />
        </div>
    );
};

export default ManageRentalsPage;
