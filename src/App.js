import logo from './logo.svg';
import './App.css';
import { Routes, Route, Navigate, NavLink } from "react-router-dom";
import Login from './component/login'
import Admin from './component/Admin';
import Register from './component/register';
function App() {
  return (
    <div className="App">
   <Routes>
   <Route path='/' element={<Login/>}/>
    <Route path='/login' element={<Login/>}/>
        <Route path='/admin' element={<Admin/>}/>
        <Route path='/register' element={<Register/>}/>


   </Routes>
   {/* <NavLink to='/login'>click</NavLink> */}
   {/* <Login/> */}
   
    </div>
  );
}

export default App;
