import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../index'
import { Navbar } from '../components/Navbar.jsx'
import { Footer } from '../components/Footer.jsx'
import imagen from '../assets/hotel.png'

import '../CSS/LoginPage.css'

export const LoginPage = () => {
    const { setLoggedIn, loggedIn, setDataUser } = useContext(AuthContext);
    const navigate = useNavigate()

    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    })

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        })

    }

    const login = async (e) => {
        try {
            const { data } = await axios.post('http://localhost:3200/user/login', credentials)
            if (data.token) {
                setLoggedIn(true)
                localStorage.setItem('token', data.token)
                setDataUser({
                    name: data.userLogged.name,
                    username: data.userLogged.username,
                    role: data.userLogged.role,
                })
                alert(data.message)
                navigate('/')
            }
        } catch (err) {
            alert(err.response.data.message)
        }
    }

    return (
        <>
            <Navbar></Navbar>
            <div className="container-fluid12">
                <div className="row main-content bg-success text-center">
                    <div className="col-md-4 text-center company__info">
                        <div className='text-center company__info1 bg-white1'>
                            <img src={imagen} alt="" />
                        </div>
                    </div>
                    <div className="col-md-8 col-xs-12 col-sm-12 login_form ">
                        <div className="container-fluid">
                            <div className="row">
                                <h2>Log In</h2>

                            </div>
                            <div className="row">
                                <form control="" className="form-group">
                                    <div className="row">
                                        <input type="text" onChange={handleChange} name="username" id="username" className="form__input" placeholder="Username" />
                                    </div>
                                    <div className="row">
                                        <span className="fa fa-lock"></span>
                                        <input type="password" onChange={handleChange} name="password" id="password" className="form__input" placeholder="Password" />
                                    </div>
                                    <div className="">
                                        <input onClick={(e) => { e.preventDefault(); login() }} type="submit" value="Log In" className="btnL" />
                                    </div>
                                </form>
                            </div>
                            <div className="row">
                                <p>Don't have an account? <Link to='/Register'><button className='btnL' type='submit' href="#">Register Here</button></Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </>
    )
}
