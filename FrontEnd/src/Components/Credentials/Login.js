import React, {useState} from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Login() {

    const [formData, setFormData] = useState({})
    const navigate = useNavigate()

    const handleInput = (e)=>{
        const{name,value} = e.target;
        setFormData({
            ...formData,
            [name] : value,
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault(); 
        console.log("Entered Value: ", formData);
        try {
            const response = await axios.post('http://127.0.0.1:8000/user-login/', formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.status === 200) {
                toast.success("Login Successful!", {
                    position: toast.POSITION.TOP_CENTER,
                    theme: 'colored'
                });
            }else{
                toast.error("Invalid Credentials!",{
                    position: toast.POSITION.TOP_CENTER,
                    theme: 'colored'
                })
            }

            navigate('/dashboard')

        } catch (error) {
            toast.error("Error!",{
                position: toast.POSITION.TOP_CENTER,
                theme: 'colored'
            })
        }
    }


  return (
    <>
    <h2 className='text-center'>User Login</h2>
    <div className='container shadow' style={{width: '30%', marginBottom: 50}}>
            <form onSubmit={handleSubmit}>
                <div className='form-group p-3'>
                    <label>Username: </label>
                    <input type='text' name='username' className='form-control' onChange={handleInput}></input>
                </div>
                <div className='form-group p-3'>
                    <label>Password: </label>
                    <input type='text' name='password' className='form-control' onChange={handleInput}></input>
                </div>
                <button type='submit' className='btn btn-primary' style={{ marginBottom: 20, marginLeft: 150 }}>login</button>
                <p className='text-center'><b>New User</b><Link to="/register">Register Here</Link></p>
            </form>
        </div>
    </>
  )
}

export default Login
