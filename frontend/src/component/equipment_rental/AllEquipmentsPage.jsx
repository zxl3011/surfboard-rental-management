import React, { useState, useEffect } from 'react';
import ApiService from '../../service/ApiService';
import Pagination from '../common/Pagination';
import EquipmentResult from '../common/EquipmentResult';
import EquipmentSearch from '../common/EquipmentSearch';



const AllEquipmentsPage = () => {
  const [equipments, setEquipments] = useState([]);
  const [filteredEquipments, setFilteredEquipments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [equipmentsPerPage] = useState(5);

  //title
  useEffect(() => {
    document.title = "Our Collection | Surfboard Rental";
  }, []);

  // Function to handle search results
  const handleSearchResult = (results) => {
    setEquipments(results);
    setFilteredEquipments(results);
  };


  useEffect(() => {
    const fetchEquipments = async () => {
      try {
        const response = await ApiService.getAllEquipments();
        const allEquipments = response.equipmentList;
        setEquipments(allEquipments);
        setFilteredEquipments(allEquipments);
      } catch (error) {
        console.error('Error fetching equipments:', error.message);
      }
    };
    fetchEquipments();
  }, []);


  // Pagination
  const indexOfLastEquipment = currentPage * equipmentsPerPage;
  const indexOfFirstEquipment = indexOfLastEquipment - equipmentsPerPage;
  const currentEquipments = filteredEquipments.slice(indexOfFirstEquipment, indexOfLastEquipment);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
      <div className='min-h-screen bg-slate-50 pb-20'>

        {/* Page Title: Elegant Serif Style */}
        <div className="container mx-auto px-4 pt-12 mb-10 text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-semibold text-slate-800">
            Our Collection
          </h2>
          <p className="mt-2 text-slate-500 text-sm tracking-wide uppercase">
            Available Boards & Rental Equipment
          </p>

        </div>

        {/* Search Bar: Independent spacing */}
        <div className="mb-12">
          <EquipmentSearch handleSearchResult={handleSearchResult} isHomePage={false} />
        </div>

        {/* Result List */}
        <div className="container mx-auto px-4">
          <EquipmentResult equipmentSearchResults={currentEquipments} />

          <div className="mt-10 flex justify-center">
            <Pagination
                equipmentsPerPage={equipmentsPerPage}
                totalEquipments={filteredEquipments.length}
                currentPage={currentPage}
                paginate={paginate}
            />
          </div>
        </div>
      </div>
  );
};

export default AllEquipmentsPage;
