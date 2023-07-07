import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useContext } from 'react'
import { Footer } from '../components/Footer.jsx'
import imagen from '../assets/hotel.png'
import { AuthContext } from '../index';


export const UpdateUser = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState({})
  const { id } = useParams();

  const { dataUser } = useContext(AuthContext)
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem('token')
  };


  const getUser = async () => {
    try {
      const { data } = await axios(`http://localhost:3200/user/get/${id}`)
      setUser(data.user)
    } catch (err) {
      console.error(err)
    }
  }

  

  const update = async (e) => {
    try {
        let updatedUser = {
            name: document.getElementById('name').value,
            surname: document.getElementById('surname').value,
            username: document.getElementById('username').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
          }
      const { data } = await axios.put(`http://localhost:3200/user/update/${id}`, updatedUser, {headers: headers})
      
      localStorage.clear();
      window.location.reload();
      navigate('/login')
      alert(`${data.message}: Please login Again`)
    } catch (err) {
      alert(err.response.data.message +': Check that the parameters such as the email are correct')
      
      
    }
  }

  

  const updateA = async (e) => {
    try {
        let updatedUser = {
            name: document.getElementById('name').value,
            surname: document.getElementById('surname').value,
            username: document.getElementById('username').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            role: document.getElementById('role').value
          }
      const { data } = await axios.put(`http://localhost:3200/user/update/${id}`, updatedUser, {headers: headers})
      alert(`${data.message}`)

    } catch (err) {
      alert(err.response.data.message +': Check that the parameters such as the email are correct')
      
      
    }
  }

  useEffect(() => getUser, [])

  return (
    <>
      <div className="container-fluid12">
        <div className="row main-content bg-success text-center">
          <div className="col-md-4 text-center company__info">
            <span className="company__logo"><h2><span className="fa fa-android"></span></h2></span>
          </div>
          <div className="col-md-8 col-xs-12 col-sm-12 login_form ">
            <div className="container-fluid">
              <div className="row">
                <h2>Update User</h2>
              </div>
              <div className="row">
                <form control="" className="form-group">
                  <div className="row">
                    <input type="text"  defaultValue={user.name}  name="name" id="name" className="form__input" placeholder="Name" />
                  </div>
                  <div className="row">
                    <input type="text"  defaultValue={user.surname}  name="surname" id="surname" className="form__input" placeholder="Surname" />
                  </div>
                  <div className="row">
                    <input type="text"  defaultValue={user.username}  name="username" id="username" className="form__input" placeholder="Username" />
                  </div>
                      <div className="row">
                         <input type="email"  defaultValue={user.email}  name="email" id="email" className="form__input" placeholder="Email please"  pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"   required aria-required />
                      </div>
                  <div className="row">
                    <input type="number"  defaultValue={user.phone} name="phone" id="phone" className="form__input" placeholder="Phone" />
                  </div>
                  {
                       dataUser.role == 'ADMIN' ? (
                        <>
                        <select className="form-control"  defaultValue={user.role} name="role" id='role'>
                        <option value='CLIENT'>CLIENT</option>
                        <option value="MANAGER">MANAGER</option>
                        <option value="ADMIN">ADMIN</option>
                        </select>
                        
                        <div className="">
                        <Link to='/Users'>
                        <input onClick={() => updateA() } type="submit" value="Update" className="btnL" />
                        </Link>
                          </div>
                          <div className="">
                            <Link to='/Users'><input type="submit" value="Cancel" className="btnL" /></Link>
                          </div>
                        </>):<>
                         <div className="">
                         <Link to='/Login'>
                          <input onClick={() => update() } type="submit" value="Update" className="btnL" />
                          </Link>
                        </div>
                        <div className="">
                          <Link to='/'><input type="submit" value="Cancel" className="btnL" /></Link>
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