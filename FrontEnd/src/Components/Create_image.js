import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

function Create_image() {
    const [formData, setFormData] = useState({})
    

    const handleInput = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    }

    const handleInputImage = (e)=>{
        const file = e.target.files[0];
        const formDataImage = new FormData()

        formDataImage.append('name', formData.name)
        formDataImage.append('email', formData.email)
        formDataImage.append('phone', formData.phone)
        formDataImage.append('image', file)

        setFormData(formDataImage)
    }

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        console.log("Entered Value: ", formData);
        try {
            const response = await axios.post('http://127.0.0.1:8000/create/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
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
            <br/>
            <h3 className="text-center">Create New Employee</h3>
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
                    <div className='form-group p-3'>
                        <label>Image: </label>
                        <input type='file' name='image' accept='image/*' className='form-control' onChange={handleInputImage}></input>
                    </div>
                    <button type='submit' className='btn btn-primary' style={{ marginBottom: 20, marginLeft: 150 }}>Create</button>
                </form>
            </div>
        </>
    )
}

export default Create_image
