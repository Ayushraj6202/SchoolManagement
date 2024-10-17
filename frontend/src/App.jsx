import { useState } from 'react'
import Header from './Components/Header.jsx'
import { Outlet } from 'react-router-dom'
import Footer from './Components/Footer.jsx'


function App() {
  return (
    <>
		<Header/>
		<main>
			<Outlet/>
		</main>
    <Footer/>
    </>
  )
}

export default App
