import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from 'react-redux'
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

  useEffect(() => {
    if (!stateStudent) {
      const fetchStudent = async () => {
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
    try {
      const response = await fetch(`${BaseUrl}/student/delete/${id}`, {
        method: 'DELETE',
      });
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
    return <div>Loading...</div>;
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
        <h1 className="text-3xl font-bold mb-4">Personal Details</h1>
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg shadow-md">
            <p><strong className="block text-gray-600">Name:</strong> {student.name}</p>
            <p><strong className="block text-gray-600">Roll ID:</strong> {student.rollId}</p>
            <p><strong className="block text-gray-600">Class:</strong> {student.class}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg shadow-md">
            <p><strong className="block text-gray-600">Date of Birth:</strong> {new Date(student.DOB).toLocaleDateString()}</p>
            <p><strong className="block text-gray-600">Year of Admission:</strong> {new Date(student.yearOfAdmission).toLocaleDateString()}</p>
          </div>
        </div>
      </section>

      {/* Parents Information */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold mb-4">Parents Information</h2>
        <div className="grid grid-cols-2 gap-6">
          {/* Father's Info */}
          <div className="bg-gray-50 p-4 rounded-lg shadow-md">
            <h3 className="font-semibold mb-2">Father</h3>
            <p><strong className="block text-gray-600">Name:</strong> {student.parent?.father?.name}</p>
            <p><strong className="block text-gray-600">Date of Birth:</strong> {student.parent?.father?.DOB ? new Date(student.parent.father.DOB).toLocaleDateString() : 'N/A'}</p>
            <p><strong className="block text-gray-600">Phone Number:</strong> {student.parent?.father?.phoneNumber || 'N/A'}</p>
          </div>

          {/* Mother's Info */}
          <div className="bg-gray-50 p-4 rounded-lg shadow-md">
            <h3 className="font-semibold mb-2">Mother</h3>
            <p><strong className="block text-gray-600">Name:</strong> {student.parent?.mother?.name}</p>
            <p><strong className="block text-gray-600">Date of Birth:</strong> {student.parent?.mother?.DOB ? new Date(student.parent.mother.DOB).toLocaleDateString() : 'N/A'}</p>
            <p><strong className="block text-gray-600">Phone Number:</strong> {student.parent?.mother?.phoneNumber || 'N/A'}</p>
          </div>
        </div>
      </section>

      {/* Address Information */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold mb-4">Address</h2>
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg shadow-md">
            <p><strong className="block text-gray-600">State:</strong> {student.address?.state || 'N/A'}</p>
            <p><strong className="block text-gray-600">City:</strong> {student.address?.city || 'N/A'}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg shadow-md">
            <p><strong className="block text-gray-600">Village:</strong> {student.address?.village || 'N/A'}</p>
            <p><strong className="block text-gray-600">Pincode:</strong> {student.address?.pincode || 'N/A'}</p>
          </div>
        </div>
      </section>

      {/* Timestamps */}
      <section className="text-sm text-gray-500 mt-4">
        <p><strong>Created At:</strong> {new Date(student.createdAt).toLocaleString()}</p>
        <p><strong>Updated At:</strong> {new Date(student.updatedAt).toLocaleString()}</p>
      </section>
    </div>

  );
}
