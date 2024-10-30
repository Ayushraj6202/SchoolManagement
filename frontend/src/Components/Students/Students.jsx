import React, { useEffect, useState } from "react";
import { format } from 'date-fns';
import { Link } from "react-router-dom";
import Loading from "../Loading";
import useScrollToTop from "./UseScrollTop.jsx";


export default function ViewStudents() {
    const BaseUrl = import.meta.env.VITE_URL_BASIC;
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useScrollToTop();

    const [searchFilters, setSearchFilters] = useState({
        name: '',
        rollId: '',
        city: '',
        class: '',
    });

    const [filteredStudents, setFilteredStudents] = useState([]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setSearchFilters({
            ...searchFilters,
            [name]: value,
        });
    };

    useEffect(() => {
        const getAllStudents = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${BaseUrl}/student/all`, {
                    method: 'GET',
                });
                const result = await response.json();

                if (response.ok) {
                    setStudents(result);
                    setFilteredStudents(result);
                    setError(null);
                } else {
                    setError("Failed to fetch students or data is not in expected format");
                }
            } catch (error) {
                setError("An error occurred while fetching students.");
            } finally {
                setLoading(false);
            }
        };
        getAllStudents();
    }, [BaseUrl]);

    const handleSearch = () => {
        const filtered = students.filter((student) => {
            return (
                (!searchFilters.name || student.name.toLowerCase().includes(searchFilters.name.toLowerCase())) &&
                (!searchFilters.rollId || student.rollId.toLowerCase().includes(searchFilters.rollId.toLowerCase())) &&
                (!searchFilters.city || student.address?.city?.toLowerCase().includes(searchFilters.city.toLowerCase())) &&
                (!searchFilters.class || student.class?.toLowerCase() === searchFilters.class.toLowerCase())
            );
        });
        setFilteredStudents(filtered);
    };
    
    const handleClearSearch = () => {
        setSearchFilters({ name: '', rollId: '', city: '', class: '' });  // Reset the search inputs
        setFilteredStudents(students);  // Display the complete list of students
    };
    
    if (loading) {
        return <Loading />
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!students || students.length === 0) {
        return (
            <div className="flex items-center justify-center min-h-screen p-4">
                <div className="bg-white shadow-lg rounded-lg p-6 text-center max-w-sm w-full">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">No Students to Display</h2>
                    <p className="text-gray-500 mb-4">It looks like there are currently no students in the database.</p>
                    <svg
                        className="w-12 h-12 text-gray-400 mx-auto mb-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 3h18M3 9h18M3 15h18M3 21h18"
                        />
                    </svg>
                    <p className="text-sm text-gray-400">Please add some students to see them listed here.</p>
                </div>
            </div>
        );
    }


    return (
        <div className="bg-blue-400">
            {/* Search Filter Form */}
            <div className="mb-6 p-4 bg-blue-300 rounded-sm">
                <h2 className="text-xl font-semibold mb-2 flex justify-center bg-blue-300 p-1">Search Students</h2>
                <div className="grid grid-cols-2 gap-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Search by Name"
                        value={searchFilters.name}
                        onChange={handleFilterChange}
                        className="p-2 border rounded-md"
                    />
                    <input
                        type="text"
                        name="rollId"
                        placeholder="Search by Roll ID"
                        value={searchFilters.rollId}
                        onChange={handleFilterChange}
                        className="p-2 border rounded-md"
                    />
                    <input
                        type="text"
                        name="city"
                        placeholder="Search by City"
                        value={searchFilters.city}
                        onChange={handleFilterChange}
                        className="p-2 border rounded-md"
                    />
                    <select
                        name="class"
                        value={searchFilters.class}
                        onChange={handleFilterChange}
                        className="p-2 border rounded-md"
                    >
                        <option value="" disabled>
                            Search by class
                        </option>
                        <option value="1st year">1st year</option>
                        <option value="2nd year">2nd year</option>
                        <option value="3rd year">3rd year</option>
                        <option value="4th year">4th year</option>
                    </select>
                </div>
                {/* Search Button */}
                <div className="mt-4 flex justify-center gap-2">
                    <button
                        onClick={handleSearch}
                        className="mr-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                        Search
                    </button>
                    <button
                        onClick={handleClearSearch}
                        className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500"
                    >
                        Clear Search
                    </button>
                </div>
            </div>


            <div className="flex flex-col items-center">
                <div className="flex flex-wrap justify-start gap-6 mb-6">
                    {filteredStudents.length > 0 ? (
                        filteredStudents.map((item) => (
                            <div
                                key={item._id}
                                className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 flex flex-col justify-between transition-transform transform hover:scale-105 hover:shadow-xl"
                            >
                                <div>
                                    <h1 className="text-lg font-bold text-gray-800">Name: {item.name}</h1>
                                    <h1 className="text-md font-semibold text-gray-700">Roll: {item.rollId}</h1>
                                    <h1 className="text-md font-semibold text-gray-700">Class: {item.class}</h1>
                                    <h1 className="text-md font-semibold text-gray-700">Date of Birth: {format(new Date(item.DOB), 'dd-MM-yyyy')}</h1>
                                    <h1 className="text-md font-semibold text-gray-700">Year of Admission: {format(new Date(item.yearOfAdmission), 'yyyy')}</h1>
                                </div>
                                <div className="mt-4">
                                    <Link
                                        to={`/students/${item._id}`}
                                        className="inline-block bg-blue-500 text-white rounded-md px-4 py-2 text-center transition-colors duration-300 hover:bg-blue-600 flex justify-center"
                                        state={{ student: item }}
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center text-gray-500">
                            <h2 className="text-lg">No students available</h2>
                        </div>
                    )}
                </div>
                {/* No Matching Students Message */}
                {filteredStudents.length === 0 && (
                    <div className="flex items-center justify-center p-4 bg-gradient-to-r from-blue-100 to-purple-100">
                        <div className="bg-white shadow-lg rounded-lg p-6 text-center max-w-sm w-full">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">No Matching Students</h2>
                            <p className="text-gray-600 mb-4">No students found matching your search criteria.</p>
                            <svg
                                className="w-16 h-16 text-gray-400 mx-auto mb-4"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 3h18M3 9h18M3 15h18M3 21h18"
                                />
                            </svg>
                            <p className="text-sm text-gray-500">Try adjusting your filters and searching again.</p>
                        </div>
                    </div>
                )}
            </div>

        </div>
    );
}
