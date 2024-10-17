import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'


import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AddStudents from './Components/Students/AddStudents.jsx'
import Students from './Components/Students/Students.jsx'
import Home from './Components/Home.jsx'
import Profile from './Components/Students/Profile.jsx'
import StudentFormEdit from './Components/Students/StudentFormEdit.jsx'

const router = createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    children:[
      {
        path:'',
        element:<Home/>
      },
      {
        path:'add-student',
        element:<AddStudents/>
      },
      {
        path:'view',
        element:<Students/>
      },
      {
        path:'students/:id',
        element:<Profile/>
      },
      {
        path:'/edit-student/:id',
        element:<StudentFormEdit/>
      },
    ]
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
