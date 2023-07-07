import { useState, useEffect } from "react";
import axios from "axios";
import { User } from "./User.jsx";
import { Navbar } from './Navbar.jsx'
import { Footer } from './Footer.jsx'
import { Link, useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'

export const Table = () => {
  const [users, setUsers] = useState([{}])
  const [title, setTitle] = useState('USERS:')
  const navigate = useNavigate()

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem('token')
  }

  const getUsers = async () => {
    try {
      const { data } = await axios('http://localhost:3200/user/get')
      setUsers(data.users)
    } catch (err) {
      console.log(err)
    }
  }

  const deleteUser = async (id) => {
    try {
      let confirmDelete = confirm('Are you sure to delete this user?')
      if (confirmDelete) {
        const { data } = await axios.delete(`http://localhost:3200/user/delete/${id}`, {headers: headers})
        console.log(data)
        alert(`${data.message}`)
        getUsers();
      }
    } catch (err) {
      console.error(err)
    }
  }

  const navigateToAdd = async()=>{
    try {
      navigate('/Register')
    } catch (err) {
      
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <Navbar></Navbar>
      <h1>Usuarios</h1>
      <div className="container-fluid12 ">
      <div className="table-responsive table-sm">

        <center>
        <h1 className='text-dark'>Usuarios</h1><br />
        <button onClick={() => navigateToAdd()} className="btn btn-info"> &nbsp;&nbsp;&nbsp;&nbsp;Agregar &nbsp;&nbsp;&nbsp;&nbsp;</button>
        </center>

        <br /><br />
        <table className="table table-bordered border-dark table-light table-hover ">
          <thead className="table-success ">
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Surname</th>
              <th scope="col">Username</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Role</th>
              <th scope="col">Actions</th>

            </tr>
          </thead>
          <tbody className="table-group-divider">
            {
              users.map(({ _id, name, surname, username, email, phone, role }, index) => {
                return (
                  <tr key={index}>
                    <User
                      name={name}
                      surname={surname}
                      username={username}
                      email={email}
                      phone={phone}
                      role={role}
                    ></User>
                    <td>
                    
                    <Link className="btn btn-warning" to={`/UpdateU/${_id}`}>
                       Actualizar
                    </Link>
                       &nbsp;&nbsp;
                      <button onClick={() => deleteUser(_id)} className="btn btn-danger">Eliminar</button>
                    </td>
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

export default Table;