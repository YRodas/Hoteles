import React from 'react'
import '../../CSS/check.css'
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { Link, useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../../index';
import { useContext } from "react";

export const Reservation = () => {
  const navigate = useNavigate()
  const { id } = useParams();
  const [benefits, setBenefits] = useState([]);
  const [selectedBenefits, setSelectedBenefits] = useState([]);
  const [bedroom, setBedroom] = useState({});
  const [reservation, setReservation] = useState({});
  const [loading, setLoading] = useState(true);
  const { dataUser } = useContext(AuthContext)
  const [tprice, setTPrice] = useState(bedroom.price);



  const headers = {
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem('token')
  };

  const [form, setForm] = useState({
    fecha1: Date.now(),
    fecha2: Date.now(),
  })

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
    console.log(form);
  }

  const getBedroom = async () => {
    try {
      const { data } = await axios(`http://localhost:3200/Bedroom/get1/${id}`, { headers: headers });
      setBedroom(data.room);
      console.log(data.room)
      setLoading(false);
    } catch (err) {
      console.log(err);
      throw new Error('Error geting bedrooms');
    }
  };

  useEffect(() => getBedroom, []);

  const createBill = async () => {
    try {
      let data1 = {
        description: `Bill of ${dataUser.name}`,
        user: dataUser.sub,
        total: tprice
      }

      const { data } = await axios.post(`http://localhost:3200/bill/create`, data1, { headers: headers })
      alert(data.message)

    } catch (error) {
      throw new Error('Error creating bill')
      alert(err.response.data.message)
    }
  }

  const createReservation = async () => {
    try {
      let confirmRes = confirm('Are you sure reserve this bedRoom?')
      if (confirmRes) {
        let form1 = {

          
          description: `user: ${dataUser.name}  reserved the room: ${bedroom.name}`,
          checkInDate: Date(form.fecha1),
          checkOutDate: Date(form.fecha2),
          user: dataUser.sub,
          bedroom: bedroom._id
          
        }
       
        const { data } = await axios.post(`http://localhost:3200/reservation/create`, form1, { headers: headers })
        alert(data.message)
        createBill()
        navigate('/Hotels')
      }
    } catch (err) {
      throw new Error('Error creating res')
      alert(err.response.data.message)
    }
  }





  const calculateDaysDifference = (date1, date2) => {
    const oneDay = 24 * 60 * 60 * 1000; // Milisegundos en un día
    const firstDate = new Date(date1);
    const secondDate = new Date(date2);
    const difference = Math.round(Math.abs((firstDate - secondDate) / oneDay));
    return difference;
  };
  
  const handleBenefitChange = (e) => {
    const id = e.target.value;
    const benefit = benefits.find(b => b._id === id);
  
    if (e.target.checked) {
      setSelectedBenefits(prevBenefits => [...prevBenefits, benefit]);
    } else {
      setSelectedBenefits(prevBenefits => prevBenefits.filter(b => b._id !== id));
    }
  };
  
  useEffect(() => {
    // Calcular el nuevo precio en función de los beneficios seleccionados y la cantidad de días
    let newPrice = bedroom.price;
    selectedBenefits.forEach(benefit => {
      newPrice += benefit.price;
    });
    const daysDifference = calculateDaysDifference(form.fecha1, form.fecha2);
    newPrice *= daysDifference;
    setTPrice(newPrice);
  }, [selectedBenefits, form.fecha1, form.fecha2]);

  useEffect(() => {
    const getBenefits = async () => {
      try {
        const { data } = await axios('http://localhost:3200/benefit/get', { headers: headers });
        setBenefits(data.benefits);
      } catch (err) {
        console.log(err);
        throw new Error('Error getting benefits');
      }
    };
    getBenefits();
  }, []);

  return (
    <>
      <Navbar />
      <div className='container-fluid12'>
        <div className="title-cards">
          <h1 className='yuyu'>¿Desea Reservar?</h1>
        </div>
        <div className="container-card">
          <div className="card">
            <figure>
              <img src="https://www.momalia.com/wp-content/uploads/2019/09/diseno-habitaciones-hotel2.jpg" />
            </figure>
            <div className="contenido-card">
              <h3>{bedroom.name}</h3>
              <p>{bedroom.description}</p>
              <p>{bedroom.location}</p>
              <p>{bedroom.size}</p>
              <h2>Q. {tprice}</h2>
            </div>
          </div>
        </div>
        <center>
          <h2 className='text-dark'>CheckIn &nbsp;&nbsp; CheckOut</h2>
          <input
            onChange={handleChange}
            type="date"
            id='fecha1'
            name='fecha1'
          />
          &nbsp;&nbsp;&nbsp;
          <input
            onChange={handleChange}
            type="date"
            id='fecha2'
            name='fecha2'
          />
        </center>
        <br />
        <h1 className="yuyu">Servicios Adicionales</h1>
        <div className="checkbox-container">
          <div>
            {benefits.map((benefit, index) => (
              <>
                <div key={benefit._id}>
                  <input
                    id={`checkbox${index}`}
                    type="checkbox"
                    value={benefit._id}
                    onChange={handleBenefitChange}
                    checked={selectedBenefits.find(b => b._id === benefit._id)}
                  />
                  <label htmlFor={`checkbox${index}`}>
                    {benefit.name}
                  </label>
                </div>
              </>
            ))}
          </div>
          <div>
            <button onClick={(e) => { e.preventDefault(); createReservation() }} className="btnL" type='submit'>Reservar </button>
            <Link to='/Room'>
              <button className="btnL" type='submit'>Cancelar</button>
            </Link>
          </div>
        </div>
        <br /><br />
      </div>
      <Footer></Footer>
    </>
  )
}
