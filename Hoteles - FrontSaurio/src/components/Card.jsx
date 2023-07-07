import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../index';
import { useContext } from 'react'




export const Card = ({ _id, name, description }) => {
    const { dataUser } = useContext(AuthContext);

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem('token')
  }

  const deleteHotel = async (id) => {
    try {
      let confirmDelete = confirm('Are you sure to delete this hotel?')
      if (confirmDelete) {
        const { data } = await axios.delete(`http://localhost:3200/hotel/delete/${id}`, { headers: headers })
        console.log(data)
        alert(`${data.message}`)
        window.location.reload();
      }
    } catch (err) {
      console.error(err)
    }
  }
  return (
    <div className="card fondoycard">
      <figure>
      </figure>
      <div className="contenido-card ">
        <h3 className='tituloC'>{name}</h3>
        <p className='text-dark'>{description}</p>
        

        {
          dataUser.role == 'ADMIN'?(
            <>
          <Link to={`/EditH/${_id}`} >
            Actualizar
          </Link>
          <button className="btn btn-danger" onClick={() => deleteHotel(_id)}>Eliminar</button>
          </>
          ):<></>
        }

        {
          dataUser.role != 'ADMIN'?(
         <>
          <Link to={`/Room/${_id}`}>
            Habitaciones
          </Link>
          </>
          ):<></>
        } 


        


      </div>
    </div>
  )
}