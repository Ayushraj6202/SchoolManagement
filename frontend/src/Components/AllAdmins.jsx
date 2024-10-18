import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import Loading from "./Loading";

export default function AllAdmins() {
    const [admins, setAdmins] = useState([]);
    const [showConfirm, setShowConfirm] = useState(false);
    const [selectedAdmin, setSelectedAdmin] = useState(null);
    const [roleChange, setRoleChange] = useState("");
    const [warning, setWarning] = useState('');
    const [isDeleteMode, setIsDeleteMode] = useState(false);
    const BaseUrl = import.meta.env.VITE_URL_BASIC;
    const role = useSelector((state) => state.admin.role);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const fetchAdmins = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${BaseUrl}/admin/all`, {
                    method: 'GET',
                    credentials: 'include',
                });
                const result = await response.json();
                setLoading(false);
                if (response.ok) {
                    setAdmins(result);
                }
            } catch (error) {
                setLoading(false);
                console.log('Admin fetch error ', error);
            }
        };
        fetchAdmins();
    }, []);

    const handleDelete = async (id) => {
        if (selectedAdmin.role === "SuperAdmin") {
            setWarning("You cannot delete another SuperAdmin!");
            setShowConfirm(false);  // Close the confirmation modal
            return;
        }
        setLoading(true);
        try {
            const response = await fetch(`${BaseUrl}/admin/delete/${id}`, {
                method: 'DELETE',
                credentials: 'include',
            });
            setLoading(false);
            if (response.ok) {
                setAdmins(admins.filter(admin => admin._id !== id));
                console.log('Admin deleted');
            } else {
                console.log('Delete failed');
            }
        } catch (error) {
            console.log('Delete error ', error);
            setLoading(false);
        }
        setShowConfirm(false); // Close the confirmation modal after action
    };

    const openDeleteModal = (admin) => {
        if (admin.role === "SuperAdmin" && role === "SuperAdmin") {
            setWarning("You cannot delete another SuperAdmin!");
            return;
        }
        setWarning('');
        setSelectedAdmin(admin);
        setIsDeleteMode(true);
        setShowConfirm(true);
    };

    const handleChangeRole = async (id) => {
        const superAdminCount = admins.filter(admin => admin.role === "SuperAdmin").length;
        if (selectedAdmin.role === "SuperAdmin" && roleChange === "Admin" && superAdminCount === 1) {
            setWarning("You cannot change the last remaining SuperAdmin to Admin!");
            setShowConfirm(false);
            return;
        }
        setLoading(true);
        try {
            const response = await fetch(`${BaseUrl}/admin/admin/${id}`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ role: roleChange }),
            });
            setLoading(false);
            if (response.ok) {
                setAdmins(admins.map(admin => admin._id === id ? { ...admin, role: roleChange } : admin));
                console.log('Role updated successfully');
            } else {
                console.log('Role change failed');
            }
        } catch (error) {
            setLoading(false);
            console.log('Role change error ', error);
        }
        setWarning('');
        setShowConfirm(false);
    };

    const openRoleChangeModal = (admin) => {
        setSelectedAdmin(admin);
        setRoleChange(admin.role);
        setIsDeleteMode(false);
        setShowConfirm(true);
    };
    if (loading) {
        return <Loading />
    }
    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <div className="text-center text-2xl font-semibold bg-blue-400 mb-6">All Active Admins</div>

            {/* Display warning if exists */}
            {warning && (
                <div className="text-center text-red-500 font-bold mb-4">{warning}</div>
            )}

            <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-6 px-4">
                {admins.map((admin) => (
                    <div
                        key={admin._id}
                        className="bg-blue-300 shadow-md rounded-lg p-4 relative"
                    >
                        {(role === 'SuperAdmin') && (
                            <div className="absolute top-2 right-2 flex gap-2">
                                <button
                                    onClick={() => openDeleteModal(admin)}
                                    className="text-white bg-red-500 hover:bg-red-600 p-2 rounded-full focus:outline-none"
                                >
                                    Remove Access
                                </button>
                                <button
                                    onClick={() => openRoleChangeModal(admin)}
                                    className="text-white bg-blue-500 p-2 rounded-full focus:outline-none"
                                >
                                    Change Role
                                </button>
                            </div>
                        )}
                        <div className="flex flex-col items-start space-y-2">
                            <h2 className="text-lg font-medium text-gray-800">Name: {admin.Name}</h2>
                            <p className="text-sm text-gray-600">Email: {admin.Email}</p>
                            <p className={`text-sm text-black-900 p-1 rounded-lg ${(admin.role === 'Admin') ? 'bg-yellow-500' : 'bg-green-500'}`}>Role: {admin.role}</p>
                            <p className="text-sm text-gray-500">Joined: {new Date(admin.createdAt).toLocaleDateString()}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Confirmation Modal */}
            {showConfirm && selectedAdmin && (
                <div className="fixed inset-0 flex justify-center items-center bg-gray-700 bg-opacity-75">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        {isDeleteMode ? (
                            <>
                                <h3 className="text-lg font-semibold mb-4">
                                    Are you sure you want to delete the profile of {selectedAdmin.Name}?
                                </h3>
                                <div className="flex justify-end space-x-4">
                                    <button
                                        className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition"
                                        onClick={() => handleDelete(selectedAdmin._id)}  // Delete the selected admin
                                    >
                                        Yes, Delete
                                    </button>
                                    <button
                                        className="bg-gray-300 px-4 py-2 rounded-lg shadow-md hover:bg-gray-400 transition"
                                        onClick={() => setShowConfirm(false)}  // Close dialog without deleting
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <h3 className="text-lg font-semibold mb-4">
                                    Change Role for {selectedAdmin.Name}
                                </h3>

                                {/* Role selection */}
                                <select
                                    value={roleChange}
                                    onChange={(e) => setRoleChange(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                                >
                                    <option value="Admin">Admin</option>
                                    <option value="SuperAdmin">SuperAdmin</option>
                                </select>

                                <div className="flex justify-end space-x-4">
                                    <button
                                        className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition"
                                        onClick={() => handleChangeRole(selectedAdmin._id)}  // Change role of the selected admin
                                    >
                                        Update Role
                                    </button>
                                    <button
                                        className="bg-gray-300 px-4 py-2 rounded-lg shadow-md hover:bg-gray-400 transition"
                                        onClick={() => setShowConfirm(false)}  // Close dialog without updating
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
