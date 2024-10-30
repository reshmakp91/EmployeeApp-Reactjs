import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function Register() {

    const [formData, setFormData] = useState({})
    const navigate = useNavigate()

    const handleInput = (e)=>{
        const{name,value} = e.target;
        setFormData({
            ...formData,
            [name] : value,
        })
    }

    const checkValidation = ()=>{

        const requiredFields = ['admin_name', 'email', 'username', 'password', 'confirm_password']
        for(const field of requiredFields){
            if(!formData[field]){
                toast.warning(`${field.replace('_','')} is required`,{
                    position: toast.POSITION.TOP_CENTER,
                    theme: 'colored'
                });
                return false;
            }
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(formData.email.toLowerCase())){
            toast.warning("Please enter valid email ID",{
                position: toast.POSITION.TOP_CENTER,
                theme: 'colored'
            });
            return false
        }

        if(formData.password !== formData.confirm_password){
            toast.warning("Passwords do not match",{
                position: toast.POSITION.TOP_CENTER,
                theme: 'colored'
            });
            return false;
        }
        return true;
    }

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        console.log("Entered Value: ", formData);
    
        if(!checkValidation()){
            return;
        }
        try {
            const response = await axios.post('http://127.0.0.1:8000/users/', formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.status === 201) {
                toast.success("Admin Created Successfully!", {
                    position: toast.POSITION.TOP_CENTER,
                    theme: 'colored'
                });
                navigate('/');
            }
            
        } catch (error) {
            if (error.response) {
                console.log("Backend Error Response:", error.response.data);
                toast.error("Failed to create user: " + error.response.data, {
                    position: toast.POSITION.TOP_CENTER,
                    theme: 'colored'
                });
            } else {
                console.log("Error occurred while creating admin:", error);
            }
        }
    }

  return (
    <>
        <ToastContainer />
        <center><h2 className='text'>Admin Registration</h2></center>
        <div className='container shadow' style={{width: '30%', marginBottom: 50}}>
            <form onSubmit={handleSubmit}>
                <div className='form-group p-3'>
                    <label>Admin Name: </label>
                    <input type='text' name='admin_name' className='form-control' onChange={handleInput}></input>
                </div>
                <div className='form-group p-3'>
                    <label>Email ID: </label>
                    <input type='text' name='email' className='form-control' onChange={handleInput}></input>
                </div>
                <div className='form-group p-3'>
                    <label>Username: </label>
                    <input type='text' name='username' className='form-control' onChange={handleInput}></input>
                </div>
                <div className='form-group p-3'>
                    <label>Password: </label>
                    <input type='text' name='password' className='form-control' onChange={handleInput}></input>
                </div>
                <div className='form-group p-3'>
                    <label>Confirm Password: </label>
                    <input type='text' name='confirm_password' className='form-control' onChange={handleInput}></input>
                </div>
                <button type='submit' className='btn btn-primary' style={{ marginBottom: 20, marginLeft: 150 }}>Create</button>
            </form>
        </div>
    </>
  )
}

export default Register
