import { useEffect, useState } from 'react'
import Header from './Components/Header.jsx'
import { Outlet } from 'react-router-dom'
import Footer from './Components/Footer.jsx'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { storelogin, storelogout } from './Store/adminSlice.js'

function App() {
	const dispatch = useDispatch();
	const adminDetail = useSelector((state) => state.admin);
	const BaseUrl = import.meta.env.VITE_URL_BASIC;
	useEffect(() => {
		const fetchDetails = async () => {
			try {
				const response = await fetch(`${BaseUrl}/admin/refresh`, {
					method: 'GET',
					credentials: 'include',
				});
				const result = await response.json();
				console.log('refresh in app ', result, response);
				if (response.ok) {
					dispatch(storelogin(result));
				}
			} catch (error) {
				console.log('after refresh fetch error ', error);
			}
		}
		if (!adminDetail.role && !adminDetail.status) {
			fetchDetails();
		}
	}, [dispatch])
	return (
		<>
			<Header />
			<main>
				<Outlet />
			</main>
			<Footer />
		</>
	)
}

export default App
