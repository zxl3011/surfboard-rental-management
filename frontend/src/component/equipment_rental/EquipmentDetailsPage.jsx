import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService'; // Assuming your service is in a file called ApiService.js
import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';

const EquipmentDetailsPage = () => {
  const navigate = useNavigate(); // Access the navigate function to navigate
  const { equipmentId } = useParams(); // Get equipment ID from URL parameters
  const [equipmentDetails, setEquipmentDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track any errors
  const [startDate, setStartDate] = useState(null); // State variable for check-in date
  const [endDate, setEndDate] = useState(null); // State variable for check-out date
  const [totalPrice, setTotalPrice] = useState(0); // State variable for total rental price
  const [showDatePicker, setShowDatePicker] = useState(false); // State variable to control date picker visibility
  const [userId, setUserId] = useState(''); // Set user id
  const [showMessage, setShowMessage] = useState(false); // State variable to control message visibility
  const [confirmationCode, setConfirmationCode] = useState(''); // State variable for rental confirmation code
  const [errorMessage, setErrorMessage] = useState(''); // State variable for error message

  //title
  useEffect(() => {
    document.title = "Equipment Details | Surfboard Rental";
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true); // Set loading state to true
        const response = await ApiService.getEquipmentById(equipmentId);
        setEquipmentDetails(response.equipment);
        const userProfile = await ApiService.getUserProfile();
        setUserId(userProfile.user.id);
      } catch (error) {
        setError(error.response?.data?.message || error.message);
      } finally {
        setIsLoading(false); // Set loading state to false after fetching or error
      }
    };
    fetchData();
  }, [equipmentId]); // Re-run effect when equipmentId changes


  const handleConfirmRental = async () => {
    // Check if check-in and check-out dates are selected
    console.log("dates:", { startDate, endDate });//for error checking
    if (!startDate || !endDate) {
      setErrorMessage('Please select check-in and check-out dates.');
      setTimeout(() => setErrorMessage(''), 5000); // Clear error message after 5 seconds
      console.log("blocked: missing dates");//error checking
      return;
    }



    // Calculate total number of days
    const oneDay = 24 * 60 * 60 * 1000; // hours * minutes * seconds * milliseconds
    const startDate = new Date(startDate);
    const endDate = new Date(endDate);
    const totalDays = Math.max(1, Math.ceil(Math.abs(endDate - startDate) / (1000 * 60 * 60 * 24)));


    // Calculate total price
    const equipmentPricePerDay = equipmentDetails.dailyRate;
    const totalPrice = equipmentPricePerDay * totalDays;

    setTotalPrice(totalPrice);

  };

  const acceptRental = async () => {
    try {

      // Ensure startDate and endDate are Date objects
      const startDate = new Date(startDate);
      const endDate = new Date(endDate);

      // Log the original dates for debugging
      console.log("Original Check-in Date:", startDate);
      console.log("Original Check-out Date:", endDate);

      // Convert dates to YYYY-MM-DD format, adjusting for time zone differences
      const formattedstartDate = new Date(startDate.getTime() - (startDate.getTimezoneOffset() * 60000)).toISOString().split('T')[0];
      const formattedendDate = new Date(endDate.getTime() - (endDate.getTimezoneOffset() * 60000)).toISOString().split('T')[0];


      // Log the original dates for debugging
      console.log("Formated Check-in Date:", formattedstartDate);
      console.log("Formated Check-out Date:", formattedendDate);

      // Create rental object
      const rental = {
        startDate: formattedstartDate,
        endDate: formattedendDate,

      };
      console.log(rental)
      console.log(endDate)

      // Make rental
      const response = await ApiService.rentalEquipment(equipmentId, userId, rental);
      if (response.statusCode === 200) {
        setConfirmationCode(response.rentalConfirmationCode); // Set rental confirmation code
        setShowMessage(true); // Show message
        // Hide message and navigate to homepage after 5 seconds
        setTimeout(() => {
          setShowMessage(false);
          navigate('/equipments'); // Navigate to equipments
        }, 10000);
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || error.message);
      setTimeout(() => setErrorMessage(''), 5000); // Clear error message after 5 seconds
    }
  };

  if (isLoading) {
    return <p className='equipment-detail-loading'>Loading equipment details...</p>;
  }

  if (error) {
    return <p className='equipment-detail-loading'>{error}</p>;
  }

  if (!equipmentDetails) {
    return <p className='equipment-detail-loading'>Equipment not found.</p>;
  }

  const { category, dailyRate, imageUrl, description, rentals } = equipmentDetails;

  return (
    <div className="equipment-details-rental">
      {showMessage && (
        <p className="rental-success-message">
          Rental successful! Confirmation code: {confirmationCode}. An SMS and email of your rental details have been sent to you.
        </p>
      )}
      {errorMessage && (
        <p className="error-message">
          {errorMessage}
        </p>
      )}
      <h2>Equipment Details</h2>
      <br />
      <img src={imageUrl} alt={category} className="equipment-details-image" />
      <div className="equipment-details-info">
        <h3>{category}</h3>
        <p>Price: ${dailyRate} / day</p>
        <p>{description}</p>
      </div>
      {rentals && rentals.length > 0 && (
        <div>
          <h3>Existing Rental Details</h3>
          <ul className="rental-list">
            {rentals.map((rental, index) => (
              <li key={rental.id} className="rental-item">
                <span className="rental-number">Rental {index + 1} </span>
                <span className="rental-text">Check-in: {rental.startDate} </span>
                <span className="rental-text">Out: {rental.endDate}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="rental-info">
        <button className="rent-now-button" onClick={() => setShowDatePicker(true)}>Rent Now</button>
        <button className="go-back-button" onClick={() => setShowDatePicker(false)}>Go Back</button>
        {showDatePicker && (
          <div className="date-picker-container">
            <DatePicker
              className="detail-search-field"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              placeholderText="Check-in Date"
              dateFormat="dd/MM/yyyy"
              // dateFormat="yyyy-MM-dd"
            />
            <DatePicker
              className="detail-search-field"
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              placeholderText="Check-out Date"
              // dateFormat="yyyy-MM-dd"
              dateFormat="dd/MM/yyyy"
            />

            <div className='guest-container'>


              <button
                  type="button"
                  className="confirm-rental"
                  onClick={async () => {
                    console.log("BUTTON clicked");
                    try {
                      await handleConfirmRental();
                      console.log("handleConfirmRental finished");
                    } catch (e) {
                      console.error("handleConfirmRental error:", e);
                    }
                  }}
              >
                Confirm Rental
              </button>
            </div>
          </div>
        )}
        {totalPrice > 0 && (
          <div className="total-price">
            <p>Total Price: ${totalPrice}</p>
            <button onClick={acceptRental} className="accept-rental">Accept Rental</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EquipmentDetailsPage;
