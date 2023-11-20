import React from 'react'
import axios from "axios"
import './DeleteBike.css'
import { Button } from 'react-bootstrap'
import { useParams,useNavigate } from 'react-router-dom'

function DeleteBike() {
    const {id}=useParams()
    const navigate=useNavigate()
    const handleDelete=(id)=>{
        axios.delete(`http://localhost:3900/api/bike/delete-bike/${id}`)
        .then((response)=>
        navigate('../Bike'))

    }
  return (
    <div>
        <center>
        <div className='alert'>
            <h2> Confirm the bike is delete</h2>
            <Button  onClick={()=>handleDelete(id)} variant='danger'>Confirm</Button>
            <Button variant='success'>Cancel</Button>

        </div>
        </center>
    </div>
  )
}

export default DeleteBike