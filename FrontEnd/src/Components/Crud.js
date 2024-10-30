import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Create_image from './Create_image';

function Crud() {
  const [data, setData] = useState([]);
  const [update, setUpdate] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [searchItem, setSearchItem] = useState('');

  const filterData = data.filter((item)=>
    item.name.toLowerCase().includes(searchItem.toLowerCase())
  );

  const recordsPerPage = 3;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = filterData.slice(firstIndex, lastIndex);
  const npage = Math.ceil(filterData.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

 
function prevPage() {
    if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
    }
}

function nextPage() {
    if (currentPage < npage) {
        setCurrentPage(currentPage + 1);
    }
}

function changePage(id) {
    setCurrentPage(id);
}

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/create/')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log("Error fetching data:", error);
      });
  }, []); 

  const updateDetails = (id) => {
    console.log('Employee ID:', id);
    fetch(`http://127.0.0.1:8000/detail/${id}/`)
      .then((response) => response.json())
      .then((res) => setUpdate(res))
      .catch((error) => console.log("Error fetching employee details:", error));
  };

  const handleInputChange = (event, fieldName) =>{
    const value = event.target.value
    setUpdate((prevUpdate)=>({
        ...prevUpdate,
        [fieldName] : value,
    }))
  };

  const handleSubmit = async (e, id) =>{
    e.preventDefault();
    const requestData = {
        id : update.id,
        name : update.name,
        email : update.email,
        phone : update.phone,
    };
    console.log("Updated Data : ", requestData)
    const response = await axios.put(`http://127.0.0.1:8000/update/${id}/`, requestData, {
        headers: {
          'Content-type': 'application/json',
        },
      });
      console.log(response)
      toast.success("Employee updated successfully",{
        position : toast.POSITION.TOP_CENTER,
        theme : 'colored'
      })
  };


  const handleDelete = (id) => {
    fetch(`http://127.0.0.1:8000/delete/${id}/`, 
        {method : 'DELETE'})
        .then(()=>{
            console.log("Deleted")
        })
  }



  return (
    <>
      <h3 className="text-center">CRUD OPERATIONS</h3>
      <div className='container-lg p-5 shadow'>
        <div className='row'>
            <input type='text' className='form-control' placeholder='Search Employee' style={{width:200}} value={searchItem}
            onChange={(e)=>{
                setSearchItem(e.target.value)
            }}></input>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">NAME</th>
              <th scope="col">EMAIL</th>
              <th scope="col">PHONE NO:</th>
              <th scope="col">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {records.map((item) => (
              <tr key={item.id}>
                <th scope="row">{item.id}</th>
                <td><img src={item.image} style={{width:50, borderRadius:"50"}}></img>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>
                  <button type="button" onClick={() => updateDetails(item.id)} className="btn btn-info" data-bs-toggle="modal"data-bs-target="#exampleModal">Update</button>
                  <button type="button" onClick={() => updateDetails(item.id)} className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteModal">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <nav aria-label="...">
            <ul className="pagination">
                <li className="page-item disabled">
                    <span className="page-link" onClick={prevPage}>Previous</span>
                </li>
                {
                    numbers.map((n,i)=>(
                        <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
                            <button className="page-link" onClick={() => changePage(n)}>{n}</button>
                        </li>
                    ))
                }
                <li className="page-item">
                    <a className="page-link" href="#" onClick={nextPage}>Next</a>
                </li>
            </ul>
        </nav>
      </div>

      {/* Update Modal */}
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Update Employee</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                <div className='container'>
                    <form onSubmit={(e)=>handleSubmit(e, update.id)}>
                        <div className='form-group'>
                            <label>Name</label>
                            <input type='text' className='form-control' value={update.name} onChange={(event)=>handleInputChange(event,'name')}></input>
                        </div>
                        <div className='form-group'>
                            <label>Email ID</label>
                            <input type='text' className='form-control' value={update.email} onChange={(event)=>handleInputChange(event,'email')}></input>
                        </div>
                        <div className='form-group'>
                            <label>Phone no:</label>
                            <input type='text' className='form-control' value={update.phone} onChange={(event)=>handleInputChange(event,'phone')}></input>
                        </div>
                        <button type="submit" className="btn btn-primary">Update</button>
                    </form>
                </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>


      {/* Delete Modal */}
      <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="#deleteModal" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="#deleteModal">Update Employee</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                <p>Do you want to delete <b>{update.name}</b></p>
                
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-danger" onClick={() => {handleDelete(update.id)}} data-bs-dismiss="modal" >Delete</button>
            </div>
          </div>
        </div>
      </div>

      <Create_image />


    </>
  );
}

export default Crud;
