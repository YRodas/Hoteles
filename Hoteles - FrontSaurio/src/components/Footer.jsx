import React from 'react'
import '../CSS/Footer.css'

const logoW = {color: "white"}

export const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-5 py-2">
      <div className="container">
        <div className="row text-center text-white">
          <h3 className=""><a href="#" className="logo">DeveloperSaurios</a></h3>
          <div className="cold-md-5">
            <a className=" btn-outline-light btn-floating m-1 " href="#!" role="button"
            ><i className="fab fa-facebook-f" style={logoW}></i></a>

            <a className=" btn-outline-light btn-floating m-1 " href="#!" role="button"
            ><i className="fab fa-twitter " style={logoW}></i></a>

            <a className=" btn-outline-light btn-floating m-1" href="#!" role="button"
            ><i className="fab fa-google " style={logoW}></i></a>

            <a className=" btn-outline-light btn-floating m-1" href="#!" role="button"
            ><i className="fab fa-instagram " style={logoW}></i></a>

            <a className=" btn-outline-light btn-floating m-1" href="#!" role="button"
            ><i className="fab fa-linkedin-in " style={logoW}></i></a>

            <a className=" btn-outline-light btn-floating m-1" href="#!" role="button"
            ><i className="fab fa-github " style={logoW}></i></a>
          </div>
        </div>
      </div>

      <div className="text-center p-3">
        © 2023 Copyright: HoteleSaruios
      </div>
    </footer>
  )
}
