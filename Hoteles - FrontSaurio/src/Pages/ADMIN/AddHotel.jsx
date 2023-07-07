import React from 'react'
import { Footer } from '../../components/Footer';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';


export const AddHotel = () => {
  const navigate = useNavigate();

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem('token')
  }

  const [form, setForm] = useState({
    name: '',
    description: '',
    location: '',
    user: '',
    events: ''
  })

  const [users, setUsers] = useState([{}])
  const [events, setEvents] = useState([{}])

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

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
    console.log(form);
  }

  const add = async () => {
    try {
      const { data } = await axios.post('http://localhost:3200/hotel/add', form, { headers: headers })
      alert(data.message)
      navigate('/Hotels')
    } catch (err) {
      alert(err.response.data.message)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      await getUsers();
      await getEvents();
    };
  
    fetchData();
  }, []);

  return (
    <>
      <div className="container-fluid12">
        <div className="row main-content12 bg-success text-center">
          <div className="login_form12">
            <div className="container-fluid">
              <div className="row">
                <h2>New Hotel</h2>
              </div>
              <div className="row">
                <form control="" className="form-group">
                  <div className="row">
                    <input type="text" onChange={handleChange} name="name" id="name" className="form__input" placeholder="Name" />
                  </div>
                  <div className="row">
                    <input type="text" onChange={handleChange} name="description" id="description" className="form__input" placeholder="Description" />
                  </div>
                  <div className="row">
                    <input type="text" onChange={handleChange} name="location" id="location" className="form__input" placeholder="Location" />
                  </div>
                  <div className="row">
                    <select id="inputEvents" onChange={handleChange}  className="form-control" name='events' required>
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
                    <select onChange={handleChange}  id="inputUsers" className="form-control" name='user' required>
                    <option value='Event'>User</option>
                      {
                        users.map(({ _id, name }, i) => {
                          return (
                            <option key={i} value={_id}>{name}</option>
                          )
                        })
                      }
                    </select>
                  </div>

                  <div className="">
                    <input onClick={(e) => { e.preventDefault(); add() }} type="submit" value="New Hotel" className="btnL" />
                  </div>
                  <div className="">
                    <Link to='/Hotels'><input type="submit" value="Cancel" className="btnL" /></Link>
                  </div>

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