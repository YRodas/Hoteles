import React from 'react'
import { BarChart } from '../../components/BarChart'
import { useState } from 'react'
import axios from 'axios'

export const Graphics = () => {
    const [hotels, setHotels] = useState({
        labels: [],
        datasets: [{
            label: '',
            data: []
        }]
    })

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
    }

    const getHotelStats = async ()=>{
        try {
            const { data } = await axios('http://localhost:3200/hotel/getStats', {headers:headers});
            if (data.hotels) {
                setHotels(
                    {labels: data.hotels.map((data)=> data.name),
                    datasets: [
                        {label: 'Más consultados',
                        data: data.hotels.map((data)=> data.requests),
                        backgroundColor: [
                            '#8RCAE6',
                            '#219EBC',
                            '#023047'
                        ],
                        borderRadius: 10
                    },
                    {
                        label: 'Más reservados',
                        data: data.hotels.map((data)=> data.reservations),
                        backgroundColor: [
                            '#FFB703',
                            '#FB8500',
                            '#ffac4d'
                        ],
                        borderRadius: 10
                    }
                    ]})
            }
        } catch (err) {
            console.error(err);
    
        }
    }
    
    useEffect(()=> getHotelsStats, [])

    return (
        <>
        <div style={{display: 'flex', flexDirection: 'column', flexWrap: 'wrap', alignItems: 'center' }}>
            <h1 className='text-center m-5'>Estadísticas por hotel</h1>
            <BarChart>charData={hotels}</BarChart>
        </div>
        </>
    )
}
