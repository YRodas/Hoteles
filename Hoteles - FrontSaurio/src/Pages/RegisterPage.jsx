import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { Footer } from '../components/Footer.jsx'
import imagen from '../assets/hotel.png'
import { AuthContext } from '../index';

export const RegisterPage = () => {
  const navigate = useNavigate()

  const { dataUser } = useContext(AuthContext)

  const [form, setForm] = useState({
    name: '',
    surname: '',
    username: '',
    password: '',
    email: '',
    phone: '',
    role:''
  })

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  

  const register = async (e) => {
    try {
      const { data } = await axios.post('http://localhost:3200/user/register', form)
      alert(data.message)
      navigate('/Login')
    } catch (err) {
      alert(err.response.data.message +': Check that the parameters such as the email are correct')
      
      
    }
  }

  const registerA = async (e) => {
    try {
      const { data } = await axios.post('http://localhost:3200/user/register', form)
      alert(data.message)
      navigate('/Users')
    } catch (err) {
      alert(err.response.data.message +': Check that the parameters such as the email are correct')
      
      
    }
  }

  

  return (
    <>
      <div className="container-fluid">
        <div className="row main-content bg-success text-center">
          <div className="col-md-4 text-center company__info">
            <span className="company__logo"><h2><span className="fa fa-android"></span></h2></span>
          </div>
          <div className="col-md-8 col-xs-12 col-sm-12 login_form ">
            <div className="container-fluid">
              <div className="row">
                <h2>Sign Up</h2>
              </div>
              <div className="row">
                <form control="" className="form-group">
                  <div className="row">
                    <input type="text" onChange={handleChange} name="name" id="name" className="form__input" placeholder="Name" />
                  </div>
                  <div className="row">
                    <input type="text" onChange={handleChange} name="surname" id="surname" className="form__input" placeholder="Surname" />
                  </div>
                  <div className="row">
                    <input type="text" onChange={handleChange} name="username" id="username" className="form__input" placeholder="Username" />
                  </div>
                  <div className="row">
                    <span className="fa fa-lock"></span>
                    <input type="password" onChange={handleChange} name="password" id="password" className="form__input" placeholder="Password" />
                  </div>
                      <div className="row">
                         <input type="email" onChange={handleChange} name="email" id="email" className="form__input" placeholder="Email please"  pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"   required aria-required />
                      </div>
                  <div className="row">
                    <input type="number" onChange={handleChange} name="phone" id="phone" className="form__input" placeholder="Phone" />
                  </div>
                  {
                       dataUser.role == 'ADMIN' ? (
                        <>
                        <select onChange={handleChange} name="role">
                        <option value='CLIENT'>CLIENT</option>
                        <option value="MAAGER">MANAGER</option>
                        <option value="ADMIN">ADMIN</option>
                        </select>
                        
                        <div className="">
                        <input onClick={(Ne) => { e.preventDefault(); registerA() }} type="submit" value="Register" className="btnL" />
                          </div>
                          <div className="">
                            <Link to='/Users'><input type="submit" value="Cancel" className="btnL" /></Link>
                          </div>
                        </>):<>
                         <div className="">
                          <input onClick={(e) => { e.preventDefault(); register() }} type="submit" value="Register" className="btnL" />
                        </div>
                        <div className="">
                          <Link to='/Login'><input type="submit" value="Cancel" className="btnL" /></Link>
                  </div></>
                                
                  }
                 
                </form>
              </div>

            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  )
}