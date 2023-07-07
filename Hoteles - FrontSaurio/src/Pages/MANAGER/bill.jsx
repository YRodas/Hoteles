import { useState, useEffect } from "react";
import axios from "axios";
import { Bill1 } from './BillDat';
import { Navbar } from '../../components/Navbar'
import { Footer } from '../../components/Footer'
import { Link, useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'

export const Bill = () => {
  const [bills, setBills] = useState([{}])
  const [title, setTitle] = useState('Bill:')
  const navigate = useNavigate()

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem('token')
  }

  const getBills = async () => {
    try {
      const { data } = await axios('http://localhost:3200/bill/get', {headers:headers})
      setBills(data.bills)
    } catch (err) {
      console.log(err)
    }
  }

  const deleteBill = async (id) => {
    try {
      let confirmDelete = confirm('Are you sure to delete this bill?')
      if (confirmDelete) {
        const { data } = await axios.delete(`http://localhost:3200/bill/delete/${id}`, {headers: headers})
        console.log(data)
        alert(`${data.message}`)
        getBills();
      }
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    getBills();
  }, []);

  return (
    <>
      <Navbar></Navbar>
      <h1>Facturas</h1>
      <div className="container-fluid12 ">
      <div className="table-responsive table-sm">

        <center>
        <h1 className='text-dark'>Facturas</h1><br />
        </center>

        <br /><br />
        <table className="table table-bordered border-dark table-light table-hover ">
          <thead className="table-success ">
            <tr>
              <th scope="col">Description</th>
              <th scope="col">User</th>
              <th scope="col">Total</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {
              bills.map(({ _id, description, user, reservation, total }, index) => {
                return (
                  <tr key={index}>
                    <Bill1
                      description={description}
                      user={user}
                      total={total}
                    ></Bill1>
                    <td>
                       &nbsp;&nbsp;
                      <button onClick={() => deleteBill(_id)} className="btn btn-danger">Eliminar</button>
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

export default Bill;