import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { storelogin } from "../Store/adminSlice";
import { useNavigate } from "react-router-dom";

export default function Login() {
	const {
		register,
		handleSubmit,
		formState: { errors },
		getValues
	} = useForm();
	const BaseUrl = import.meta.env.VITE_URL_BASIC;
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [onsubErr, setOnsubErr] = useState('');
	const [loading, setLoading] = useState(false);

	const onSubmit = async (data) => {
		setLoading(true);
		setOnsubErr('');
		try {
			const response = await fetch(`${BaseUrl}/admin/login`, {
				method: 'POST',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					Password: getValues('Password'),
					Email: getValues('Email'),
				}),
			});
			const result = await response.json();

			if (response.ok) {
				dispatch(storelogin(result));
				navigate('/view');
			} else {
				setOnsubErr(result.message || 'Login failed. Please check your credentials.');
			}
		} catch (error) {
			console.log("Error while logging in", error);
			setOnsubErr('An error occurred. Please try again.');
		} finally {
			setLoading(false);
		}
	};

	return (
		<section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center">
			<div className="px-6 py-8 mx-auto w-full max-w-md">
				<div className="bg-white rounded-lg shadow dark:bg-gray-800 dark:border dark:border-gray-700">
					<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
						<h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
							Sign in to your account
						</h1>
						{/* Display error message */}
						{onsubErr && (
							<div className="text-red-500 text-center font-bold">
								{onsubErr}
							</div>
						)}
						<form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
							<div>
								<label
									htmlFor="Email"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
								>
									Your email
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
									className={`bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white ${errors.Email ? "border-red-500" : ""
										}`}
									placeholder="name@company.com"
								/>
								{errors.Email && (
									<p className="text-red-500 text-sm">{errors.Email.message}</p>
								)}
							</div>

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
									className={`bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white ${errors.Password ? "border-red-500" : ""
										}`}
									placeholder="••••••••"
								/>
								{errors.Password && (
									<p className="text-red-500 text-sm">{errors.Password.message}</p>
								)}
							</div>
							{/* Display loading spinner or button */}
							<button
								type="submit"
								className={`w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ${loading ? 'cursor-not-allowed' : ''
									}`}
								disabled={loading} // Disable button while loading
							>
								{loading ? 'Signing in...' : 'Sign in'}
							</button>

							<p className="text-sm font-light text-gray-500 dark:text-gray-400">
								Don’t have an account yet?{" "}
								<Link
									to="/signup"
									className="font-medium text-primary-600 hover:underline dark:text-primary-500"
								>
									Sign up
								</Link>
							</p>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
}
