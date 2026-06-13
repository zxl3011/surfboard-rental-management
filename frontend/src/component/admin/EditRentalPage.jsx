import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService'; // Assuming your service is in a file called ApiService.js

const EditRentalPage = () => {
    const navigate = useNavigate();
    const { rentalCode } = useParams();
    const [rentalDetails, setRentalDetails] = useState(null); // State variable for rental details
    const [error, setError] = useState(null); // Track any errors
    const [success, setSuccessMessage] = useState(null); // Track any errors



    useEffect(() => {
        const fetchRentalDetails = async () => {
            try {
                const response = await ApiService.getRentalByConfirmationCode(rentalCode);
                setRentalDetails(response.rental);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchRentalDetails();
    }, [rentalCode]);


    const acheiveRental = async (rentalId) => {
        if (!window.confirm('Are you sure you want to Acheive this rental?')) {
            return; // Do nothing if the user cancels
        }

        try {
            const response = await ApiService.cancelRental(rentalId);
            if (response.statusCode === 200) {
                setSuccessMessage("The boking was Successfully Acheived")
                
                setTimeout(() => {
                    setSuccessMessage('');
                    navigate('/admin/manage-rentals');
                }, 3000);
            }
        } catch (error) {
            setError(error.response?.data?.message || error.message);
            setTimeout(() => setError(''), 5000);
        }
    };

    return (
        <div className="find-rental-page">
            <h2>Rental Detail</h2>
            {error && <p className='error-message'>{error}</p>}
            {success && <p className='success-message'>{success}</p>}
            {rentalDetails && (
                <div className="rental-details">
                    <h3>Rental Details</h3>
                    <p>Confirmation Code: {rentalDetails.rentalConfirmationCode}</p>
                    <p>Check-in Date: {rentalDetails.startDate}</p>
                    <p>Check-out Date: {rentalDetails.endDate}</p>
                    <p>Num Of Adults: {rentalDetails.numOfAdults}</p>
                    <p>Num Of Children: {rentalDetails.numOfChildren}</p>
                    <p>Guest Email: {rentalDetails.guestEmail}</p>

                    <br />
                    <hr />
                    <br />
                    <h3>Booker Detials</h3>
                    <div>
                        <p> Name: {rentalDetails.user.name}</p>
                        <p> Email: {rentalDetails.user.email}</p>
                        <p> Phone Number: {rentalDetails.user.phoneNumber}</p>
                    </div>

                    <br />
                    <hr />
                    <br />
                    <h3>Equipment Details</h3>
                    <div>
                        <p> Equipment Type: {rentalDetails.equipment.category}</p>
                        <p> Equipment Price: ${rentalDetails.equipment.dailyRate}</p>
                        <p> Equipment Description: {rentalDetails.equipment.description}</p>
                        <img src={rentalDetails.equipment.imageUrl} alt="" sizes="" srcSet="" />
                    </div>
                    <button
                        className="acheive-rental"
                        onClick={() => acheiveRental(rentalDetails.id)}>Acheive Rental
                    </button>
                </div>
            )}
        </div>
    );
};

export default EditRentalPage;
