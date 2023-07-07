import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'

import { AuthContext } from '../index';

export const Navbar = () => {
  const { dataUser } = useContext(AuthContext);
  const [loggedIn, setLoggedIn] = useState(false);
  const _id = dataUser.sub;

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem('token')
  };



  const logOut = () => {
    localStorage.clear();
    window.location.reload();
  };

  const deleteUser = async (id) => {
    try {
      let confirmDelete = confirm('Are you sure to delete this user?')
      if (confirmDelete) {
        const { data } = await axios.delete(`http://localhost:3200/user/delete/${id}`, { headers: headers })
        console.log(data)
        alert(`${data.message}`)
        logOut();
      }

    } catch (err) {
      console.error(err)
    }
  }

  const getUserLogged = () => {
    const token = localStorage.getItem('token');
    if (token) {
      setLoggedIn(true);
    }
  };

  useEffect(() => {
    getUserLogged();
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand">Hoteleria</a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            
            {dataUser.role === 'ADMIN' && (
              <>
                <li className="nav-item">
                  <Link to="/Users" className="nav-link">
                    Users
                  </Link>
                </li>
              
              </>
            )}
            {dataUser.role === 'MANAGER' && (
             <></>
            )}
            {dataUser.role === 'MANAGER' && (
              <li className="nav-item">
                <Link to="/Hosted" className="nav-link">
                  Hosted
                </Link>
              </li>
            )}
            {dataUser.role === 'MANAGER' && (
              <li className="nav-item">
                <Link to="/Bill" className="nav-link">
                  Bill
                </Link>
              </li>
            )}
            {loggedIn ? (
              <>
              <li className="nav-item">
              <Link to="/Hotels" className="nav-link">
                Hotels
              </Link>
              </li>
              
              </>):
                 <li className="nav-item">
                 <Link to="/Login" className="nav-link">
                   Login
                 </Link>
               </li>
              }
          </ul>
          
            {loggedIn ? (
              <>
              <ul className="navbar-nav ml-auto">
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Welcome {dataUser.name}, {dataUser.role}
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <Link
                    to="/Login"
                    className="nav-link text-dark"
                    onClick={() => logOut()}
                  >
                    LogOut
                  </Link>
                  <Link
                    to={`/UpdateU/${dataUser.sub}`}
                    className="nav-link text-dark"
                  >
                    Update Profile
                  </Link>
                  <Link
                    to="/Login"
                    onClick={() => deleteUser(dataUser.sub)}
                    className="nav-link text-dark"
                  >
                    Delete Profile
                  </Link>
                </ul>
              </li>
              </ul>
              </>
            ) : (
              
             <></>
            )}
          
        </div>
      </div>
    </nav>

  );
};

export default Navbar;