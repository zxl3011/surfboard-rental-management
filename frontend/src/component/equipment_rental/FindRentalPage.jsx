import React, { useState, useEffect } from 'react';
import ApiService from '../../service/ApiService';

const FindRentalPage = () => {
    const [confirmationCode, setConfirmationCode] = useState('');
    const [rentalDetails, setRentalDetails] = useState(null);
    const [error, setError] = useState(null);

    //title
    useEffect(() => {
        document.title = "Find Your Rental | Surfboard Rental";
    }, []);

    const handleSearch = async () => {
        if (!confirmationCode.trim()) {
            setError("Please Enter a rental confirmation code");
            setTimeout(() => setError(''), 5000);
            return;
        }
        try {
            const response = await ApiService.getRentalByConfirmationCode(confirmationCode);
            setRentalDetails(response.rental);
            setError(null);
        } catch (error) {
            setError(error.response?.data?.message || error.message);
            setTimeout(() => setError(''), 5000);
        }
    };

    return (
        // Main Container: Reduced top padding for a tighter feel
        <div className="min-h-screen bg-slate-50 py-12 px-4 flex flex-col items-center justify-start">

            {/* Card Container: Narrower (max-w-lg), lighter shadow, smaller radius */}
            <div className="bg-white w-full max-w-lg rounded-2xl shadow-lg overflow-hidden transition-all duration-300 border border-slate-100">

                {/* 1. Header Section: LIGHTER DESIGN - Clean white background instead of heavy brand color */}
                <div className="bg-white p-8 text-center border-b border-slate-50">
                    <h2 className="text-2xl font-bold text-slate-800 mb-2">Track Your Rental</h2>
                    <p className="text-slate-500 text-sm font-medium">
                        Enter your confirmation code to view details
                    </p>
                </div>

                {/* 2. Search Input Section: Reduced padding */}
                <div className="p-8">
                    <div className="flex flex-col gap-4">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">
                            Confirmation Code
                        </label>
                        <input
                            required
                            type="text"
                            placeholder="e.g. ABCDEFGHIJ"
                            value={confirmationCode}
                            onChange={(e) => setConfirmationCode(e.target.value)}
                            // Input Style: Slimmer (py-3), smaller font (text-base)
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-semibold text-base placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all"
                        />
                        <button
                            onClick={handleSearch}
                            // Button Style: Slimmer (py-3), lighter shadow
                            className="w-full mt-2 bg-brand hover:bg-teal-700 text-white font-bold text-lg py-3 rounded-xl shadow-md shadow-brand/20 transition-all transform active:scale-[0.98]"
                        >
                            Find Booking
                        </button>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="mt-6 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 rounded text-sm text-center font-medium">
                            {error}
                        </div>
                    )}
                </div>

                {/* 3. Result Section: Tighter spacing */}
                {rentalDetails && (
                    <div className="bg-slate-50 border-t border-slate-100 p-8">

                        {/* Booking ID Badge: Smaller padding */}
                        <div className="flex justify-center mb-8">
                            <div className="bg-white border border-slate-200 px-4 py-2 rounded-full shadow-sm flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                                <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">ID</span>
                                <span className="text-slate-900 font-mono font-bold text-base">{rentalDetails.rentalConfirmationCode}</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-6">

                            {/* Schedule Info: Lighter text weights */}
                            <div className="space-y-3">
                                <h3 className="text-slate-900 font-bold text-xs uppercase tracking-wider border-b border-slate-200 pb-2">Schedule</h3>
                                <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                                    <div>
                                        <p className="text-[10px] text-slate-400 uppercase font-bold mb-1">Check-in</p>
                                        <p className="text-brand font-semibold text-base">{rentalDetails.startDate}</p>
                                    </div>
                                    <div className="h-8 w-[1px] bg-slate-100 mx-4"></div>
                                    <div className="text-right">
                                        <p className="text-[10px] text-slate-400 uppercase font-bold mb-1">Check-out</p>
                                        <p className="text-slate-800 font-semibold text-base">{rentalDetails.endDate}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Equipment Info Card: More compact */}
                            <div className="mt-4">
                                <h3 className="text-slate-900 font-bold text-xs uppercase tracking-wider border-b border-slate-200 pb-2 mb-4">Reserved Gear</h3>
                                <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4">
                                    <img
                                        src={rentalDetails.equipment.imageUrl}
                                        alt="Surfboard"
                                        className="w-20 h-20 object-cover rounded-lg bg-slate-100 border border-slate-100"
                                    />
                                    <div>
                                        <span className="inline-block bg-teal-50 text-brand text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide mb-1">
                                            Confirmed
                                        </span>
                                        <h4 className="text-lg font-bold text-slate-800">{rentalDetails.equipment.category}</h4>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                )}
            </div>
        </div>
    );
};

export default FindRentalPage;