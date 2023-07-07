import React from 'react'
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import '../CSS/HomePage.css'
import { Link } from 'react-router-dom'

export const HomePage = () => {
  return (
    <>
      <Navbar />

      <header>
        <div id="showcase" className="py-80 imgShadow">
          <div className="container">
            <h1>Welcome to hoteleria</h1>
            <p className="large">"Nuestro gestor de hoteles altamente capacitado está dedicado a garantizar que tengas una estancia inolvidable en nuestro hotel. Siempre está disponible para ayudarte con cualquier necesidad que puedas tener y asegurarse de que tu experiencia sea perfecta en todos los sentidos."</p>
          </div>
        </div>
      </header>

      <section id="reservation" className="py-20">
          <div className='containerRe'>
            <Link to='/Hotels' className="btnL btn-dark">Make Reservation</Link>
          </div>
      </section>

      <section id="features" className=''>
        <div className="box features-1 shadow-lg p-5 mb-5 bg-body ">
        <div className='text-center'>
          <h4>Double Room</h4>
          <p>Una habitación doble pueden incluir camas cómodas, ropa de cama de alta calidad, baño privado,
            televisor, escritorio y silla, minibar, Wi-Fi gratuito y servicio de habitaciones.</p>
        </div>
        </div>
        <div className="box features-2 shadow-lg p-5 mb-5 bg-body ">
        <div className='text-center'>
          <h4>Deluxe Room</h4>
          <p>Habitación Deluxe pueden incluir un espacio adicional, vista panorámica, amenities de lujo, televisor de pantalla plana, Wi-Fi gratuito, minibar,
            servicio de habitaciones 24 horas, cafetera y té, servicio de limpieza diario y acceso a instalaciones exclusivas.</p>
        </div>
        </div>
        <div className="box features-3 shadow-lg p-5 mb-5 bg-body ">
          <div className='text-center'>
            <h4>Honeymoon Room</h4>
            <p>Contamos con una decoración romántica, una cama con dosel, una bañera de hidromasaje o jacuzzi, una terraza o balcón privado con vistas,
              amenities de lujo, servicio de habitaciones 24 horas, una botella de vino o champán, y servicio de limpieza diario.</p>
          </div>
        </div>
      </section>

      <div className="clr"></div>
      <Footer></Footer>

    </>
  )
}