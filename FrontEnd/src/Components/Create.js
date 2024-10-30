import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

function Create() {

    const [formData, setFormData] = useState({})

    const handleInput = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        console.log("Entered Value: ", formData);
        try {
            const response = await axios.post('http://127.0.0.1:8000/create/', formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.status === 201) {
                toast.success("New Employee Created Successfully!", {
                    position: toast.POSITION.TOP_CENTER,
                    theme: 'colored'
                });
            }
        } catch (error) {
            console.log("Error occurred while creating employee:", error);
        }
    }

    return (
        <>
            <div className='container shadow' style={{ width: '30%', marginBottom: 50 }}>
                <form onSubmit={handleSubmit}>
                    <div className='form-group p-3'>
                        <label>Employee Name: </label>
                        <input type='text' name='name' className='form-control' onChange={handleInput}></input>
                    </div>
                    <div className='form-group p-3'>
                        <label>Email ID: </label>
                        <input type='text' name='email' className='form-control' onChange={handleInput}></input>
                    </div>
                    <div className='form-group p-3'>
                        <label>Phone Number: </label>
                        <input type='text' name='phone' className='form-control' onChange={handleInput}></input>
                    </div>
                    <button type='submit' className='btn btn-primary' style={{ marginBottom: 20, marginLeft: 150 }}>Create</button>
                </form>
            </div>
        </>
    )
}

export default Create;
