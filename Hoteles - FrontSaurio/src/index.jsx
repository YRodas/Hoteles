import React, { createContext, useState, useEffect } from 'react'
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { HomePage } from './Pages/HomePage'
import { LoginPage } from './Pages/LoginPage'
import { RegisterPage } from './Pages/RegisterPage' 
import { NotFoundPage } from './Pages/NotFoundPage'
import { Reservation } from './Pages/CLIENT/Reservation';
import { Hotels } from './Pages/CLIENT/Hotels'
import jwt_decode from 'jwt-decode';
import { Users } from './Pages/ADMIN/Users'
import { AddRoom } from './Pages/MANAGER/AddRoom';
import { CardR } from './Pages/MANAGER/Room'
import {UpdateUser} from './Pages/UpdateUser'
import { AddHotel } from './Pages/ADMIN/AddHotel';
import { EditRoom } from './Pages/MANAGER/EditRoom';
import { EditHotel } from './Pages/ADMIN/EditHotel';
import { Hosted } from './Pages/MANAGER/Hosted';
import { BuscarHotels } from './Pages/CLIENT/BuscarHotel';
import { Bill } from './Pages/MANAGER/bill';


export const AuthContext = createContext();

//ESTE COMPONTE SIRVE PARA CREAR EL ENRUTADOR Y AL MISMO PASARLE UN CONTEXTO (SERIE DE DATOS, OBJETOS, STRINGS, ARRAYS)

export const Index = () => {

    const [loggedIn, setLoggedIn] = useState(false)

    const [dataUser, setDataUser] = useState({
        sub: '',
        name: '',
        username: '',
        role: ''
    })

    const getUserDataFromToken = () => {
        const token = localStorage.getItem("token");
        if (token) {
            const decodedToken = jwt_decode(token);
            setLoggedIn(true);
            setDataUser(decodedToken);
        }
    };

    useEffect(() => {
        getUserDataFromToken();
    }, []);

    const routes = createBrowserRouter([
        {
            path: '/',
            element: <App />,
            errorElement: <NotFoundPage />,
            children: [
                {
                    path: '/',
                    element: <HomePage />
                },
                {
                    path: '/Register',
                    element: <RegisterPage />
                },
                {
                    path: '/Login',
                    element: <LoginPage />
                },
                {
                    path: '/Users',
                    element: 
                    loggedIn?(
                      dataUser.role == 'ADMIN'? <Users/> :<HomePage/>
                    ): <LoginPage/>
                },
                {
                    path: '/Hotels',
                    element: 
                    loggedIn?(
                     <Hotels/>
                    ): <LoginPage/>
                },
                {
                    path: '/Reser/:id',
                    element: loggedIn?(
                        dataUser.role == 'CLIENT'? <Reservation />:<HomePage/>
                    ): <LoginPage/>
                },
                {
                    path: '/Add',
                    element: 
                    loggedIn?(
                      dataUser.role == 'MANAGER'? <AddRoom/> : <HomePage/>
                    ):<LoginPage/>
                  },
                  {
                    path: '/UpdateU/:id',
                    element:
                    loggedIn?(
                        <UpdateUser/>
                    ):<LoginPage/>
                },
                {
                    path: '/Room/:id',
                    element:
                    loggedIn?(
                        <CardR/>
                    ):<LoginPage/>
                },
                {
                    path: '/AddHotel',
                    element:
                    loggedIn?(
                        <AddHotel/>
                    ):<LoginPage/>
                },
                 {
                  path: '/EditR/:id',
                   element: 
                   loggedIn?(
                   dataUser.role == 'MANAGER'? <EditRoom/> : <HomePage/>
                   ):<LoginPage/>
                },
                {
                    path: '/EditH/:id',
                     element: 
                     loggedIn?(
                     dataUser.role == 'ADMIN'? <EditHotel/> : <HomePage/>
                     ):<LoginPage/>
                  },

                {
                path: '/Hosted',
                  element: 
                  loggedIn?(
                  dataUser.role == 'MANAGER'? <Hosted/> : <HomePage/>
                  ):<LoginPage/>
              },{
                path: '/BuscarHo/:cellarName',
                element: loggedIn?<BuscarHotels/>:<LoginPage/>
              },
              {
                path: '/Bill',
                  element: 
                  loggedIn?(
                  dataUser.role == 'MANAGER'? <Bill/> : <HomePage/>
                  ):<LoginPage/>
              }
            ]
        }
    ])


    return (
        <AuthContext.Provider value={{ loggedIn, setLoggedIn, dataUser, setDataUser }}>
            <RouterProvider router={routes} />
        </AuthContext.Provider>
    )

}