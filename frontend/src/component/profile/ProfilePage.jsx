import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    //title
    useEffect(() => {
        document.title = "My Profile | Surfboard Rental";
    }, []);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await ApiService.getUserProfile();
                // Fetch user rentals using the user ID
                const userPlusRentals = await ApiService.getUserRentals(response.user.id);
                setUser(userPlusRentals.user);
            } catch (error) {
                setError(error.response?.data?.message || error.message);
            }
        };

        fetchUserProfile();
    }, []);

    const handleLogout = () => {
        const confirm = window.confirm("Are you sure you want to logout?");
        if (confirm) {
            ApiService.logout();
            navigate('/home');
        }
    };

    const handleEditProfile = () => {
        navigate('/edit-profile');
    };

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4">
            <div className="max-w-5xl mx-auto">

                {/* 1. Header Section: Welcome Message & Buttons */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <div className="text-center md:text-left">
                        <h2 className="text-3xl font-bold text-slate-800">
                            Welcome, <span className="text-brand">{user?.name}</span>
                        </h2>
                        <p className="text-slate-500 text-sm mt-1">Manage your account and view rental history</p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                        <button
                            onClick={handleEditProfile}
                            className="px-6 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold shadow-sm hover:bg-slate-50 transition-all"
                        >
                            Manage Profile
                        </button>
                        <button
                            onClick={handleLogout}
                            className="px-6 py-2.5 rounded-xl bg-slate-200 text-slate-700 font-bold hover:bg-red-50 hover:text-red-600 transition-all"
                        >
                            Logout
                        </button>
                    </div>
                </div>

                {/* Error Message */}
                {error && <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-center">{error}</div>}

                {/* 2. User Details Card */}
                {user && (
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 mb-10">
                        <h3 className="text-xl font-bold text-slate-800 mb-6 border-b border-slate-100 pb-4">
                            Contact Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                                    Email Address
                                </label>
                                <p className="text-lg font-semibold text-slate-800">{user.email}</p>
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                                    Phone Number
                                </label>
                                <p className="text-lg font-semibold text-slate-800">{user.phoneNumber}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* 3. Rental History Section */}
                <h3 className="text-2xl font-bold text-slate-800 mb-6">My Rentals</h3>

                <div className="grid grid-cols-1 gap-6">
                    {user && user.rentals && user.rentals.length > 0 ? (
                        user.rentals.map((rental) => (
                            // Rental Card
                            <div key={rental.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow flex flex-col md:flex-row">

                                {/* Image Section */}
                                <div className="w-full md:w-48 h-48 md:h-auto bg-slate-100 relative">
                                    <img
                                        src={rental.equipment.imageUrl}
                                        alt="Surfboard"
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute top-2 left-2 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-bold text-slate-800">
                                        ID: {rental.id}
                                    </div>
                                </div>

                                {/* Content Section */}
                                <div className="p-6 flex-1 flex flex-col justify-center">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <span className="inline-block px-3 py-1 bg-teal-50 text-brand text-xs font-bold rounded-full uppercase tracking-wider mb-2">
                                                Confirmed
                                            </span>
                                            <h4 className="text-xl font-bold text-slate-800">
                                                Code: <span className="font-mono text-slate-600">{rental.rentalConfirmationCode}</span>
                                            </h4>
                                        </div>
                                        {/* Category Name */}
                                        <div className="text-right">
                                            <p className="text-sm text-slate-400 font-bold uppercase">Gear</p>
                                            <p className="font-bold text-slate-700 text-lg">{rental.equipment.category}</p>
                                        </div>
                                    </div>

                                    {/* Dates Grid */}
                                    <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
                                        <div>
                                            <p className="text-[10px] text-slate-400 uppercase font-bold">Check-in</p>
                                            <p className="font-bold text-slate-800">{rental.startDate}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-slate-400 uppercase font-bold">Check-out</p>
                                            <p className="font-bold text-slate-800">{rental.endDate}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        // Empty State (when no rentals found)
                        <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-slate-300">
                            <p className="text-slate-400 text-lg mb-4">You haven't rented any boards yet.</p>
                            <button
                                onClick={() => navigate('/equipments')}
                                className="px-6 py-3 bg-brand text-white rounded-xl font-bold hover:bg-teal-700 transition-colors shadow-lg shadow-brand/20"
                            >
                                Browse Boards Now
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;