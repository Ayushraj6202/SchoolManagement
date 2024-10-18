import React, { useEffect, useState } from "react";
import { format } from 'date-fns';
import { Link } from "react-router-dom";
import Loading from "../Loading";

export default function ViewStudents() {
    const BaseUrl = import.meta.env.VITE_URL_BASIC;
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // State for search input
    const [searchFilters, setSearchFilters] = useState({
        name: '',
        rollId: '',
        city: '',
    });

    // State for search result
    const [filteredStudents, setFilteredStudents] = useState([]);

    // Function to handle input changes for search filters
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
                    setFilteredStudents(result);  // Initially display all students
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

    // Function to handle search on button click
    const handleSearch = () => {
        const filtered = students.filter((student) => {
            return (
                (!searchFilters.name || student.name.toLowerCase().includes(searchFilters.name.toLowerCase())) &&
                (!searchFilters.rollId || student.rollId.toLowerCase().includes(searchFilters.rollId.toLowerCase())) &&
                (!searchFilters.city || student.address?.city?.toLowerCase().includes(searchFilters.city.toLowerCase()))
            );
        });
        setFilteredStudents(filtered);
    };
    const handleClearSearch = () => {
        setSearchFilters({ name: '', rollId: '', city: '' });  // Reset the search inputs
        setFilteredStudents(students);  // Display the complete list of students
    };
    if (loading) {
        return <Loading />
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!students || students.length === 0) {
        return <div>No Students to display</div>;
    }

    return (
        <div className="my-3">
            {/* Search Filter Form */}
            <div className="mb-6 p-4 bg-gray-100 rounded-lg">
                <h2 className="text-xl font-semibold mb-2">Search Students</h2>
                <div className="grid grid-cols-3 gap-4">
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
                </div>
                {/* Search Button */}
                <div className="mt-4">
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

            {/* Filtered Student Cards */}
            <div className="flex flex-wrap justify-start gap-3">
                {filteredStudents.length > 0 ? (
                    filteredStudents.map((item) => (
                        <div
                            key={item._id}
                            className="bg-gradient-to-br from-white to-gray-100 rounded-lg shadow-lg p-4 flex flex-col justify-between"
                        >
                            <div>
                                <h1>Name: {item.name}</h1>
                                <h1>Roll: {item.rollId}</h1>
                                <h1>Class: {item.class}</h1>
                                <h1>Date of Birth: {format(new Date(item.DOB), 'dd-MM-yyyy')}</h1>
                                <h1>Year of Admission: {format(new Date(item.yearOfAdmission), 'yyyy')}</h1>
                            </div>
                            <div className="mt-4">
                                <Link
                                    to={`/students/${item._id}`}
                                    className="text-blue-500 hover:underline"
                                    state={{ student: item }}
                                >
                                    View Details
                                </Link>
                            </div>
                        </div>
                    ))
                ) : (
                    <div>No students match the search criteria.</div>
                )}
            </div>
        </div>
    );
}
