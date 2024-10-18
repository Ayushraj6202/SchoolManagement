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
import Login from './Components/Login.jsx'
import SignUp from './Components/SignUp.jsx'
import { Provider } from 'react-redux'
import store from './Store/store.js'
import Layout from './Components/Layout.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <Home />
      },
      {
        path: 'add-student',
        // element:<AddStudents/>
        element: (
          <Layout role={'SuperAdmin'}>
            <AddStudents />
          </Layout>
        )
      },
      {
        path: 'view',
        element: <Students />
      },
      {
        path: 'students/:id',
        element: <Profile />
      },
      {
        path: 'edit-student/:id',
        // element:<StudentFormEdit/>
        element: (
          <Layout status={true}>
            <StudentFormEdit />
          </Layout>
        )
      },
      {
        path: 'login',
        element: (
          <Layout status={false}>
            <Login />
          </Layout>
        )
      },
      {
        path: 'signup',
        element: (
          <Layout role={'SuperAdmin'}>
            <SignUp />
          </Layout>
        )
      },
    ]
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
