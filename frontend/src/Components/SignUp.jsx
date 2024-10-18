import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues
    } = useForm();
    const BaseUrl = import.meta.env.VITE_URL_BASIC;
    const navigate = useNavigate();

    const [showCard, setShowCard] = useState(false);
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data) => {
        setLoading(true);
        setErrorMessage('');
        try {
            const response = await fetch(`${BaseUrl}/admin/signup`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Name: getValues('Name'),
                    Password: getValues('Password'),
                    Email: getValues('Email'),
                    role: getValues('role'),
                })
            });
            const result = await response.json();
            setLoading(false);
            if (response.ok) {
                setCredentials({ email: data.Email, password: data.Password });
                setShowCard(true);
            } else {
                setErrorMessage(result.message || "Something went wrong. Please try again.");
            }
        } catch (error) {
            setLoading(false);
            setErrorMessage("Error during signup. Please check your network and try again.");
            console.log("error while signup", error);
        }
    };

    return (
        <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center">
            <div className="px-6 py-8 mx-auto w-full max-w-md">
                <div className="bg-white rounded-lg shadow dark:bg-gray-800 dark:border dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Sign up for a new account
                        </h1>

                        {/* Error message display */}
                        {errorMessage && (
                            <div className="bg-red-100 text-red-700 p-2 rounded-md">
                                <p>{errorMessage}</p>
                            </div>
                        )}

                        {/* Card for displaying credentials */}
                        {showCard && (
                            <div className="mt-4 p-4 border border-gray-300 rounded-lg bg-white shadow-md bg-blue-200">
                                <h2 className="text-lg font-bold">Your Signup Credentials</h2>
                                <p className="text-gray-700 dark:text-gray-300">Email: {credentials.email}</p>
                                <p className="text-gray-700 dark:text-gray-300">Password: {credentials.password}</p>
                                <p className="text-gray-500 dark:text-gray-400">Take a screenshot of this information for future reference!</p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
                            {/* Name Input */}
                            <div>
                                <label
                                    htmlFor="Name"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Your Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    {...register("Name", { required: "Name is required" })}
                                    className={`bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white ${errors.Name ? "border-red-500" : ""}`}
                                    placeholder="Your full name"
                                />
                                {errors.Name && (
                                    <p className="text-red-500 text-sm">{errors.Name.message}</p>
                                )}
                            </div>

                            {/* Email Input */}
                            <div>
                                <label
                                    htmlFor="Email"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Your Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    {...register("Email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                            message: "Enter a valid email address",
                                        },
                                    })}
                                    className={`bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white ${errors.Email ? "border-red-500" : ""}`}
                                    placeholder="name@company.com"
                                />
                                {errors.Email && (
                                    <p className="text-red-500 text-sm">{errors.Email.message}</p>
                                )}
                            </div>

                            {/* Password Input */}
                            <div>
                                <label
                                    htmlFor="Password"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    {...register("Password", {
                                        required: "Password is required",
                                        minLength: {
                                            message: "Password must be at least 6 characters",
                                        },
                                    })}
                                    className={`bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white ${errors.Password ? "border-red-500" : ""}`}
                                    placeholder="••••••••"
                                />
                                {errors.Password && (
                                    <p className="text-red-500 text-sm">{errors.Password.message}</p>
                                )}
                            </div>

                            {/* Role Selection */}
                            <div>
                                <label
                                    htmlFor="role"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Select Role
                                </label>
                                <select
                                    id="role"
                                    {...register("role", { required: "Role is required" })}
                                    className={`bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white ${errors.role ? "border-red-500" : ""}`}
                                >
                                    <option value="" disabled hidden>
                                        -- Please select your role --
                                    </option>
                                    <option value="Admin">Admin</option>
                                    <option value="SuperAdmin">SuperAdmin</option>
                                </select>
                                {errors.role && (
                                    <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>
                                )}
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                disabled={loading}
                            >
                                {loading ? 'Signing up...' : 'Sign up'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
