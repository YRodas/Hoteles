import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../index';
import { useContext } from 'react'

export const Card2 = ({ _id, name, description, availability }) => {
  const { dataUser } = useContext(AuthContext);

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem('token')
  }

  const deleteRoom = async (id) => {
    try {
      let confirmDelete = confirm('Are you sure to delete this room?')
      if (confirmDelete) {
        const { data } = await axios.delete(`http://localhost:3200/bedroom/delete/${id}`, { headers: headers })
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
        <h2 className='text-dark' >Disponibilidad: {availability}</h2>

        {
          dataUser.role == 'MANAGER'?(
            <>
          <Link to={`/EditR/${_id}`} >
            Actualizar
          </Link>
          <button className="btn btn-danger" onClick={() => deleteRoom(_id)}>Eliminar</button>
          </>
          ):<></>
        }

        {
          dataUser.role == 'CLIENT'?(
            availability != "No"?(
          <>
          <Link to={`/Reser/${_id}`} >
            Reservar
          </Link>
          </>
          ):<></>
          ):<></>
        } 


        


      </div>
    </div>
  )
}