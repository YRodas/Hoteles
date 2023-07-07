import React from 'react'
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { Link } from 'react-router-dom'
import { useNavigate, Routes, Route, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react';
import axios from 'axios';

export const EditRoom = () => {
  const { id } = useParams();
  const [bedroom, setBedroom] = useState({});
  const [loading, setLoading] = useState(true);

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem('token')
  }

  const getBedroom = async () => {
    try {
      const { data } = await axios(`http://localhost:3200/bedroom/get1/${id}`, { headers: headers });
      setBedroom(data.room)
      console.log(data.room)
      setLoading(false);
    } catch (err) {
      console.log(err);
      throw new Error('Error getting Bedrooms');
    }
  };

  const updateBedroom = async () => {
    try {
      let updatedBedroom = {
        name: document.getElementById('name').value,
        description: document.getElementById('description').value,
        availability: document.getElementById('availability').value,
        price: document.getElementById('price').value
      }
      const { data } = await axios.put(`http://localhost:3200/bedroom/update/${id}`, updatedBedroom, { headers: headers })
      alert(`${data.message}`)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => getBedroom, [])

  return (
    <>
      <Navbar />
      <div className="container-fluid12">
        <div className="row main-content12 bg-success text-center">
          <div className="login_form12">
            <div className="container-fluid">
              <div className="row">
                <h2 className="">Actualizar Habitacion</h2>
              </div>
              <div className='row'>
                <form control="" className='container'>
                  <div className="row">
                    <input defaultValue={bedroom.name} id='name' placeholder="Name" className='form__input' type="text" />
                  </div>
                  <div className="row">
                    <input defaultValue={bedroom.description} id='description' placeholder="Description" className='form__input' type="text" />
                  </div>
                 
                  <div className="row">
                    <input defaultValue={bedroom.price} id='price' placeholder="Price" className='form__input' type="number" />
                  </div>
                  <div className="row">
                      <select id='availability' className="form-select text-black" aria-label="Default select example">
                        <option>Availability</option>
                        <option value="si">Disponible</option>
                        <option value="No">No Disponible</option>
                      </select>
                  </div>
                </form>

                <Link to='/Hotels'>
                  <button onClick={() => updateBedroom()} className="btnL" type='submit'>Actualizar</button>
                </Link>
                <br />
                <Link to='/Hotels'>
                  <button className="btnL" type='submit'>Cancelar</button>
                </Link>

              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  )
}
