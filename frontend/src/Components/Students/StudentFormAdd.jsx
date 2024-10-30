import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "../Loading";

export default function StudentFormAdd() {
    const { register, handleSubmit, setValue, getValues } = useForm();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const location = useLocation();
    const BaseUrl = import.meta.env.VITE_URL_BASIC;

    const { student } = location.state || {};
    // console.log(student);

    useEffect(() => {
        if (student) {
            setValue("name", student.name);
            setValue("rollId", student.rollId);
            setValue("class", student.class);
            setValue("DOB", new Date(student.DOB).toISOString().split("T")[0]);  // Assuming you want the date in "YYYY-MM-DD" format
            setValue('studentId', student.studentId);
            setValue('parent.father.name', student.parent.father.name);
            setValue('parent.father.DOB', new Date(student.parent.father.DOB).toISOString().split('T')[0]); // Assuming date format
            setValue('parent.father.phoneNumber', student.parent.father.phoneNumber);
            setValue('parent.mother.name', student.parent.mother.name);
            setValue('parent.mother.DOB', new Date(student.parent.mother.DOB).toISOString().split('T')[0]);
            setValue('parent.mother.phoneNumber', student.parent.mother.phoneNumber);
            setValue('address.state', student.address.state);
            setValue('address.city', student.address.city);
            setValue('address.village', student.address.village);
            setValue('address.pincode', student.address.pincode);
            setValue("yearOfAdmission", new Date(student.yearOfAdmission).toISOString().split("T")[0]);
        }
    }, [student, setValue]);
    const navigate = useNavigate();
    const submit = async (data) => {
        setLoading(true);
        try {
            const url = `${BaseUrl}/student/add`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: getValues("name"),
                    rollId: getValues("rollId"),
                    class: getValues("class"),
                    DOB: getValues("DOB"),
                    yearOfAdmission: getValues("yearOfAdmission"),
                    fatherName: getValues("parent.father.name"),
                    fatherDOB: getValues("parent.father.DOB"),
                    fatherPhoneNumber: getValues("parent.father.phoneNumber"),
                    motherName: getValues("parent.mother.name"),
                    motherDOB: getValues("parent.mother.DOB"),
                    motherPhoneNumber: getValues("parent.mother.phoneNumber"),
                    state: getValues("address.state"),
                    city: getValues("address.city"),
                    village: getValues("address.village"),
                    pincode: getValues("address.pincode"),
                }),
            });
            const result = await response.json();
            console.log("add stud ", response, result);

            if (response.ok) {
                console.log("Student Added");
                navigate(`/view`)
            }
            console.log("Updated Data:", data);
        } catch (err) {
            console.error("Error:", err);
            setError("An error occurred while updating the student details. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }
    if (loading) {
        return <Loading />
    }
    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap gap-4">
            {/* Student Details Section */}
            <div className="w-full mb-6">
                <h2 className="text-lg font-bold mb-4 flex justify-center bg-blue-300 p-1">Student Details</h2>
                <div className="border p-4 rounded-lg bg-gray-50 shadow-md grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-bold mb-1">Name</label>
                        <input
                            placeholder="Name"
                            className="border p-2 w-full"
                            {...register("name", { required: true })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold mb-1">Roll ID</label>
                        <input
                            placeholder="Roll ID"
                            className="border p-2 w-full"
                            {...register("rollId", { required: true })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold mb-1">Class</label>
                        <select
                            className="border p-2 w-full"
                            {...register("class", { required: true })}
                        >
                            <option value="" disabled>Select Class</option>
                            <option value="1st Year">1st Year</option>
                            <option value="2nd Year">2nd Year</option>
                            <option value="3rd Year">3rd Year</option>
                            <option value="4th Year">4th Year</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-bold mb-1">Date of Birth</label>
                        <input
                            type="date"
                            className="border p-2 w-full"
                            {...register("DOB", { required: true })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold mb-1">Year of Admission</label>
                        <input
                            type="date"
                            className="border p-2 w-full"
                            {...register("yearOfAdmission", { required: true })}
                        />
                    </div>
                </div>
            </div>

            {/* Parent Details Section */}
            <div className="w-full mb-6">
                <h2 className="text-lg font-bold mb-4 flex justify-center bg-blue-300 p-1">Parent Details</h2>
                <div className="border p-4 rounded-lg bg-gray-50 shadow-md grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-bold mb-1">Father's Name</label>
                        <input
                            {...register("parent.father.name")}
                            placeholder="Father's Name"
                            className="border p-2 w-full"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold mb-1">Mother's Name</label>
                        <input
                            {...register("parent.mother.name")}
                            placeholder="Mother's Name"
                            className="border p-2 w-full"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold mb-1">Father's DOB</label>
                        <input
                            {...register("parent.father.DOB")}
                            type="date"
                            className="border p-2 w-full"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold mb-1">Mother's DOB</label>
                        <input
                            {...register("parent.mother.DOB")}
                            type="date"
                            className="border p-2 w-full"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold mb-1">Father's Phone Number</label>
                        <input
                            {...register("parent.father.phoneNumber")}
                            placeholder="Father's Phone Number"
                            className="border p-2 w-full"
                        />
                    </div>


                    <div>
                        <label className="block text-sm font-bold mb-1">Mother's Phone Number</label>
                        <input
                            {...register("parent.mother.phoneNumber")}
                            placeholder="Mother's Phone Number"
                            className="border p-2 w-full"
                        />
                    </div>
                </div>
            </div>

            {/* Address Section */}
            <div className="w-full mb-6">
                <h2 className="text-lg font-bold mb-4 flex justify-center bg-blue-300 p-1">Address</h2>
                <div className="border p-4 rounded-lg bg-gray-50 shadow-md grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-bold mb-1">State</label>
                        <input
                            {...register("address.state")}
                            placeholder="State"
                            className="border p-2 w-full"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold mb-1">City</label>
                        <input
                            {...register("address.city")}
                            placeholder="City"
                            className="border p-2 w-full"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold mb-1">Village</label>
                        <input
                            {...register("address.village")}
                            placeholder="Village"
                            className="border p-2 w-full"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold mb-1">Pincode</label>
                        <input
                            {...register("address.pincode")}
                            type="number"
                            placeholder="Pincode"
                            className="border p-2 w-full"
                        />
                    </div>
                </div>
            </div>

            {/* Submit Button */}
            <div className="w-full">
                <button
                    type="submit"
                    className={`w-full p-2 text-white rounded-full mb-1 ${student ? "bg-green-500" : "bg-blue-500"}`}
                    disabled={loading}
                >
                    Submit
                </button>
            </div>
        </form>


    );
}
