import { useState, useEffect } from "react";
import axios from "axios";
import { User } from "../../components/User.jsx";
import { Navbar } from '../../components/Navbar.jsx'
import { Footer } from '../../components/Footer.jsx'
import { Link, useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'

export const Hosted = () => {
  const [reservations, setReservations] = useState([{}])
  const[users, setUsers] = useState([{}])
  const [title, setTitle] = useState('USERS:')
  const navigate = useNavigate()

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem('token')
  }

  const getUsers = async (_id) => {
    try {
      const { data } = await axios(`http://localhost:3200/user/get/${_id}`)
      setUsers(data.users)
    } catch (err) {
      console.log(err)
    }
  }

  const getReservations = async () =>{
    try {
      const { data } = await axios('http://localhost:3200/reservation/get',{headers:headers})
      setReservations(data.reservation)
     
      console.log(data.reservation)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getReservations();
  }, []);

  return (
    <>
      <Navbar></Navbar>
      <h1>Usuario</h1>
      <div className="container-fluid12 ">
      <div className="table-responsive table-sm">
        <center>
        <h1 className='text-dark'>Usuarios</h1><br />
        </center>
        <br /><br />
        <table className="table table-bordered border-dark table-light table-hover ">
          <thead className="table-success ">
            <tr>
              <th scope="col">Description,</th>
              <th scope="col">CheckInDate</th>
              <th scope="col">CheckOutDate</th>
              <th scope="col">User</th>
              <th scope="col">BedRoom</th>
             
            </tr>
          </thead>
          <tbody className="table-group-divider">
          {
              reservations.map(({ _id, description, checkInDate, checkOutDate, user,bedroom}, index) => {
                return (
                  <tr key={index}>
                    <td>{description}</td>
                    <td>{checkInDate}</td>
                    <td>{checkOutDate}</td> 
                    <td>{user}</td>
                    <td>{bedroom}</td>
                    
                    
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
      </div>
      <Footer></Footer>
    </>
  )
}

export default Hosted;