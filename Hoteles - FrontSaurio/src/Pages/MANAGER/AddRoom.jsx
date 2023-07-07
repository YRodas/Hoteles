import React from 'react';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import '../../CSS/Room.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';

import axios from 'axios'

export const AddRoom = () => {
  const navigate = useNavigate();

  const [hotels, setHotels] = useState([{}])

  const getHotels= async () => {
    try {
      const { data } = await axios('http://localhost:3200/hotel/hotels')
      setHotels(data.hotels)
    } catch (err) {
      console.error(err);
    }
  }

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem('token')
  }

  const [form, setForm] = useState({
    name: '',
    description: '',
    availability: '',
    price: '',
    hotel: ''
  })

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
    console.log(form);
  }

  const add = async () => {
    try {
      const { data } = await axios.post('http://localhost:3200/bedroom/create', form, { headers: headers })
      alert(data.message)
     
    } catch (err) {
      alert(err.response.data.message)
    }
  }

  useEffect(() => getHotels, [])

  return (

    <>
      <Navbar />
      <div className="container-fluid12">
        <div className="row main-content12 bg-success text-center">
          <div className="login_form12">
            <div className="container-fluid">
              <div className="row">
                <h2>Add Room</h2>
              </div>
              <div className="row">
                <form control="" className="container">
                  <div className="row">
                    <input type="text" onChange={handleChange} value={form.name} name="name" id="name" className="form__input" placeholder="Name" />
                  </div>
                  <div className="row">
                    <input type="text" onChange={handleChange} value={form.description} name="description" id="description" className="form__input" placeholder="Description" />
                  </div>
                  <div className='row'>
                  <select className="form-control"  onChange={handleChange} name="availability" id='role'>
                        <option value='Availability'>Availability</option>
                        <option value="Si">Disponible</option>
                        <option value="No">No Disponible</option>
                        </select>
                  </div>
                  <div className="row">
                    <input type="number" onChange={handleChange} value={form.price} name="price" id="price" className="form__input" placeholder="Price" />
                  </div>
                </form>
                <div className="row">
                    <select onChange={handleChange} id="inputUsers" className="form-control" name='hotel' required>
                    <option value='Hotel'>Hotel</option>
                      {
                        hotels.map(({ _id, name }, i) => {
                          return (

                            <option key={i} value={_id}>{name}</option>
                          )
                        })
                      }
                    </select>
                  </div>
                <div className="">
                  <Link to='/Hotel'><input type="submit" onClick={()=> add()} value="Add" className="btnL" /></Link>
                </div>
                <div className="">
                  <Link to='/Hotel'><input type="submit" value="Cancel" className="btnL" /></Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  )
}