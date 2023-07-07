import React from 'react'
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { Link } from 'react-router-dom'
import { useNavigate, Routes, Route, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react';
import axios from 'axios';

export const EditHotel = () => {
  const { id } = useParams();
  const [hotel, setHotel] = useState({});
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([{}])
  const [events, setEvents] = useState([{}])

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem('token')
  }

  const getUsers = async () => {
    try {
      const { data } = await axios('http://localhost:3200/user/get')
      setUsers(data.users)
    } catch (err) {
      console.error(err);
    }
  }

  const getEvents = async () => {
    try {
      const { data } = await axios('http://localhost:3200/event/get',{headers:headers})
      setEvents(data.events)
    } catch (err) {
      console.error(err);
    }
  }

  const getHotel = async () => {
    try {
      const { data } = await axios(`http://localhost:3200/hotel/hotel/${id}`, { headers: headers });
      setHotel(data.hotel)
      console.log(data.hotel)
      setLoading(false);
    } catch (err) {
      console.log(err);
      throw new Error('Error getting Hotels');
    }
  };

  const updateHotel = async () => {
    try {
      let updatedHotel = {
        name: document.getElementById('name').value,
        description: document.getElementById('description').value,
        location: document.getElementById('location').value,
        events: document.getElementById('events').value,
        user: document.getElementById('user').value
      }
      const { data } = await axios.put(`http://localhost:3200/hotel/update/${id}`, updatedHotel, { headers: headers })
      alert(`${data.message}`)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      await getUsers();
      await getEvents();
      await getHotel();
    };
  
    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container-fluid12">
        <div className="row main-content12 bg-success text-center">
          <div className="login_form12">
            <div className="container-fluid">
              <div className="row">
                <h2 className="">Actualizar Hotel</h2>
              </div>
              <div className="row">
                <form control="" className="form-group">
                  <div className="row">
                    <input type="text" defaultValue={hotel.name} name="name" id="name" className="form__input" placeholder="Name" />
                  </div>
                  <div className="row">
                    <input type="text" defaultValue={hotel.description} name="description" id="description" className="form__input" placeholder="Description" />
                  </div>
                  <div className="row">
                    <input type="text" defaultValue={hotel.location} name="location" id="location" className="form__input" placeholder="Location" />
                  </div>
                  <div className="row">
                    <select id="events" defaultValue={hotel.events} className="form-control" name='events'  required>
                      <option value='Event'>Event</option>
                      {
                        events.map(({ _id, name }, i) => {
                          return (
                            <option key={i} value={_id}>{name}</option>
                          )
                        })
                      }
                    </select>
                  </div>
                  <br />

                  <div className="row"> 
                    <select id="user" defaultValue={hotel.user} className="form-control"  name='user' required>
                      <option value='User'>User</option>
                      {
                        users.map(({ _id, name }, i) => {
                          return (
                            <option key={i} value={_id}>{name}</option>
                          )
                        })
                      }
                    </select>
                  </div>

                  <Link to='/Hotels'>
                    <button onClick={() => updateHotel()} className="btnL" type='submit'>Actualizar</button>
                  </Link>
                  <br />
                  <Link to='/Hotels'>
                    <button className="btnL" type='submit'>Cancelar</button>
                  </Link>
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