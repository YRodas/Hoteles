import React from 'react'
import { Navbar } from '../../components/Navbar'
import { Card } from '../../components/Card'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../index'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { SearchBar } from '../../components/SearchBar'

export const BuscarHotels = () => {
    const [hotels, setHotels] = useState([{}])
    const { cellarName } = useParams();
    const { dataUser } = useContext(AuthContext);
    

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      };
    

    const searchHotels = async () => {
        try {
        
            const {data} = await axios.post('http://localhost:3200/hotel/search-name', { name: cellarName },{ headers: headers });
            setHotels(data.hotel)
            console.log(data.hotels)

        } catch (err) {
            console.log(err)
            throw new Error('Error getting hotels')
        }
    }



    useEffect(() => searchHotels, [hotels])
    
    return (
        <>
            <Navbar />

            <div className="title-cards">
                <h1>Hoteles</h1>
            </div>
            
            <SearchBar></SearchBar>
            <div className="container-card row g-0 justify-content-center">

                {dataUser.role === 'ADMIN' ? (
                    <>
                        <div className="card">
                            <figure>
                                <img src="https://assets.hiltonstatic.com/hilton-asset-cache/image/upload/t_MODx%20-%20Masthead/t_MODx%20-%20Masthead/v1626385058/Imagery/Property%20Photography/Hilton%20Full%20Service/C/CTGHIHH/Facade_Pool_Complex.jpg" />
                            </figure>
                            <div className="contenido-card">
                                <h3>Agregar hoteles</h3>

                                <Link to='/AddHotel'>
                                    Agregar
                                </Link>

                            </div>
                        </div>
                    </>
                ) : <></>}

                {
                    hotels.map(({ _id, name, description, availability }, i) => {
                        return (
                            <Card
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
