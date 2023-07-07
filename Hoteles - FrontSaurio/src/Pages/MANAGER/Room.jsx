import React from 'react'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Card2 } from '../../components/Card2'
import { Navbar } from '../../components/Navbar';
import '../../CSS/Card.css'
import { useContext } from 'react'
import { AuthContext } from '../../index'
import axios from 'axios'
import { useParams } from 'react-router-dom';

export const CardR= ({ _id, name, description, availability }) => {
    const [rooms, setRooms] = useState([{}])
    const { dataUser } = useContext(AuthContext);
    const { id } = useParams();

    const headers = {
		'Content-Type': 'application/json',
		'Authorization': localStorage.getItem('token')
	}



	/*función para obtener las bodegas */
	const getRooms = async () => {
		try {
			const { data } = await axios(`http://localhost:3200/bedroom/get2/${id}`, { headers: headers })
			
				setRooms(data.room)
			
			
		} catch (err) {
			console.log(err)
			throw new Error('Error getting rooms')
		}
	}

	useEffect(() => getRooms, [])
    return (
        <>
        <Navbar />

        

        <div className="title-cards">
            <h1>Habitaciones</h1>
        </div>
        <br />
        <div className="container-card row g-0 justify-content-center">


        { dataUser.role === 'MANAGER'?( 
              <>
            <div className="card">
                <figure>
                    <img src="https://www.entornoturistico.com/wp-content/uploads/2018/06/Hotel-sant-jaume-660x330.jpg" />
                </figure>
                <div className="contenido-card">
                    <h3>Agregar habitaciones</h3>

                    <Link to='/Add'>
                        Agregar
                    </Link>

                </div>
            </div>
            </>
        ):<></>}

            {
                rooms.map(({_id, name, description, availability }, i) => {
                    return (
                        <Card2
                            key={i}
                            name={name}
                            description={description}
                            availability={availability}
                            _id={_id}
                            
                        />
                    )
                })
            }






        </div>

    </>
    )
}