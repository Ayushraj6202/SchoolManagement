import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from 'react-redux'
import Loading from "../Loading";
import useScrollToTop from "./UseScrollTop.jsx";
export default function Profile() {
	const { id } = useParams();
	const location = useLocation();
	const navigate = useNavigate();
	const { student: stateStudent } = location.state || {};
	const [student, setStudent] = useState(stateStudent || null);
	const [loading, setLoading] = useState(!stateStudent);
	const [showConfirm, setShowConfirm] = useState(false);

	const BaseUrl = import.meta.env.VITE_URL_BASIC;
	const role = useSelector((state) => state.admin.role);
	// console.log(role);

	useScrollToTop();
	useEffect(() => {
		if (!stateStudent) {
			const fetchStudent = async () => {
				setLoading(true);
				try {
					const response = await fetch(`${BaseUrl}/student/userId/${id}`, {
						method: 'GET',
					});
					if (response.ok) {
						const data = await response.json();
						setStudent(data);
					} else {
						console.log('Error fetching student data');
					}
				} catch (error) {
					console.log('Error fetching student: ', error);
				} finally {
					setLoading(false);
				}
			};

			fetchStudent();
		}
	}, [id, stateStudent, BaseUrl]);

	const handleDelete = async (id) => {
		setLoading(true);
		try {
			const response = await fetch(`${BaseUrl}/student/delete/${id}`, {
				method: 'DELETE',
			});
			setLoading(false);
			if (response.ok) {
				navigate('/view');
			} else {
				console.log('Failed to delete the student');
			}
		} catch (error) {
			console.log('Error while deleting:', error);
		}
	};

	if (loading) {
		return <Loading />
	}

	if (!student) {
		return <div>No student data available</div>;
	}

	return (
		<div className="p-6 w-full max-w-4xl mx-auto bg-white rounded-lg shadow-lg space-y-8">
			{/* Edit and Delete Section */}
			<div className="flex justify-end space-x-4">
				{
					(role === 'SuperAdmin' || role === 'Admin') && (

						<Link
							to={`/edit-student/${student._id}`}
							state={{ student: student }}
							className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition"
						>
							Edit Details
						</Link>
					)
				}
				{
					role === 'SuperAdmin' &&
					(<button
						className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition"
						onClick={() => setShowConfirm(true)} // Show confirm dialog on delete click
					>
						Delete Profile
					</button>)
				}
			</div>

			{/* Confirmation Dialog */}
			{showConfirm && (
				<div className="fixed inset-0 flex justify-center items-center bg-gray-700 bg-opacity-75">
					<div className="bg-white p-6 rounded-lg shadow-lg w-96">
						<h3 className="text-lg font-semibold mb-4">Are you sure you want to delete this profile?</h3>
						<div className="flex justify-end space-x-4">
							<button
								className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition"
								onClick={() => handleDelete(student._id)} // Delete the student
							>
								Yes, Delete
							</button>
							<button
								className="bg-gray-300 px-4 py-2 rounded-lg shadow-md hover:bg-gray-400 transition"
								onClick={() => setShowConfirm(false)} // Close dialog without deleting
							>
								Cancel
							</button>
						</div>
					</div>
				</div>
			)}

			{/* Student Personal Details */}
			<section className="space-y-4">
				<h1 className="text-3xl font-bold mb-4 text-center">Personal Details</h1>
				<div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-6">
					<div className="bg-gray-50 p-6 rounded-lg shadow-md">
						<div className="flex justify-between border-b border-gray-200 pb-2 mb-2">
							<strong className="text-gray-600">Name:</strong>
							<span className="text-gray-800">{student.name}</span>
						</div>
						<div className="flex justify-between border-b border-gray-200 pb-2 mb-2">
							<strong className="text-gray-600">Roll ID:</strong>
							<span className="text-gray-800">{student.rollId}</span>
						</div>
						<div className="flex justify-between border-b border-gray-200 pb-2 mb-2">
							<strong className="text-gray-600">Class:</strong>
							<span className="text-gray-800">{student.class}</span>
						</div>
					</div>
					<div className="bg-gray-50 p-6 rounded-lg shadow-md">
						<div className="flex justify-between border-b border-gray-200 pb-2 mb-2">
							<strong className="text-gray-600">Date of Birth:</strong>
							<span className="text-gray-800">{new Date(student.DOB).toLocaleDateString()}</span>
						</div>
						<div className="flex justify-between border-b border-gray-200 pb-2 mb-2">
							<strong className="text-gray-600">Year of Admission:</strong>
							<span className="text-gray-800">{new Date(student.yearOfAdmission).toLocaleDateString()}</span>
						</div>
					</div>
				</div>
			</section>


			{/* Parents Information */}
			{/* Parents Information */}
			<section className="space-y-4">
				<h2 className="text-2xl font-semibold mb-4 text-center">Parents Information</h2>
				<div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-6">
					{/* Father's Info */}
					<div className="bg-gray-50 p-6 rounded-lg shadow-md">
						<h3 className="font-semibold mb-2 flex justify-center">Father</h3>
						<div className="flex justify-between border-b border-gray-200 pb-2 mb-2">
							<strong className="text-gray-600">Name:</strong>
							<span className="text-gray-800">{student.parent?.father?.name || 'N/A'}</span>
						</div>
						<div className="flex justify-between border-b border-gray-200 pb-2 mb-2">
							<strong className="text-gray-600">Date of Birth:</strong>
							<span className="text-gray-800">{student.parent?.father?.DOB ? new Date(student.parent.father.DOB).toLocaleDateString() : 'N/A'}</span>
						</div>
						<div className="flex justify-between border-b border-gray-200 pb-2 mb-2">
							<strong className="text-gray-600">Phone Number:</strong>
							<span className="text-gray-800">{student.parent?.father?.phoneNumber || 'N/A'}</span>
						</div>
					</div>

					{/* Mother's Info */}
					<div className="bg-gray-50 p-6 rounded-lg shadow-md">
						<h3 className="font-semibold mb-2 flex justify-center">Mother</h3>
						<div className="flex justify-between border-b border-gray-200 pb-2 mb-2">
							<strong className="text-gray-600">Name:</strong>
							<span className="text-gray-800">{student.parent?.mother?.name || 'N/A'}</span>
						</div>
						<div className="flex justify-between border-b border-gray-200 pb-2 mb-2">
							<strong className="text-gray-600">Date of Birth:</strong>
							<span className="text-gray-800">{student.parent?.mother?.DOB ? new Date(student.parent.mother.DOB).toLocaleDateString() : 'N/A'}</span>
						</div>
						<div className="flex justify-between border-b border-gray-200 pb-2 mb-2">
							<strong className="text-gray-600">Phone Number:</strong>
							<span className="text-gray-800">{student.parent?.mother?.phoneNumber || 'N/A'}</span>
						</div>
					</div>
				</div>
			</section>

			{/* Address Information */}
			<section className="space-y-4 mt-6">
				<h2 className="text-2xl font-semibold mb-4 text-center">Address</h2>
				<div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-6">
					<div className="bg-gray-50 p-6 rounded-lg shadow-md">
						<div className="flex justify-between border-b border-gray-200 pb-2 mb-2">
							<strong className="text-gray-600">State:</strong>
							<span className="text-gray-800">{student.address?.state || 'N/A'}</span>
						</div>
						<div className="flex justify-between border-b border-gray-200 pb-2 mb-2">
							<strong className="text-gray-600">City:</strong>
							<span className="text-gray-800">{student.address?.city || 'N/A'}</span>
						</div>
					</div>
					<div className="bg-gray-50 p-6 rounded-lg shadow-md">
						<div className="flex justify-between border-b border-gray-200 pb-2 mb-2">
							<strong className="text-gray-600">Village:</strong>
							<span className="text-gray-800">{student.address?.village || 'N/A'}</span>
						</div>
						<div className="flex justify-between border-b border-gray-200 pb-2 mb-2">
							<strong className="text-gray-600">Pincode:</strong>
							<span className="text-gray-800">{student.address?.pincode || 'N/A'}</span>
						</div>
					</div>
				</div>
			</section>

			{/* Timestamps */}
			<section className="space-y-2 mt-6">
				<h2 className="text-2xl font-semibold mb-4 text-center">Timestamps</h2>
				<div className="bg-gray-50 p-4 rounded-lg shadow-md">
					<div className="flex justify-between border-b border-gray-200 pb-2 mb-2">
						<strong className="text-gray-600">Created At:</strong>
						<span className="text-gray-800">{new Date(student.createdAt).toLocaleString()}</span>
					</div>
					<div className="flex justify-between">
						<strong className="text-gray-600">Updated At:</strong>
						<span className="text-gray-800">{new Date(student.updatedAt).toLocaleString()}</span>
					</div>
				</div>
			</section>

		</div>

	);
}
