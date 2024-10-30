import Crud from "./Components/Crud";
import Create from "./Components/Create";
import Create_image from "./Components/Create_image";
import Register from "./Components/Credentials/Register";
import Login from "./Components/Credentials/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <br/>
      {/*<h3 className="text-center">CRUD OPERATIONS</h3>
      <Crud />
      <h3 className="text-center">Create New Employee</h3>*/}
      {/*<Create />*/}
      {/*<Create_image />
      <Register />
      <Login />*/}
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Login />}></Route>
          <Route exact path='register/' element={<Register />}></Route>
          <Route exact path='dashboard/' element={<Crud />}></Route>
        </Routes>
      </BrowserRouter>
      
    
    </>
  );
}

export default App;
