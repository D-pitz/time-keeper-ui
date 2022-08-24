import React from 'react';
import {Routes, Route, useNavigate} from "react-router-dom"
import AllUsers from '../Components/Admin/AllUsers';
import Login from '../Components/Login/Login';
import Shift from '../Components/Login/Shift/Shift';
import ShiftTable from '../Components/Login/Shift/Tables/ShiftTable';
import Register from '../Components/Register/Register';

const RoutesComponent = (props) => {
    return (
        <Routes>
            <Route path="/" element = { <Login /> } />
            <Route path="/login" element = { <Login /> } />
            <Route path="/register" element = { <Register /> } />
            <Route path="/shifts" element = { <Shift /> } />
            <Route path="/shifts/user" element= { <ShiftTable user = {props.user}/>} />
            <Route path="/ADMIN/users" element = { <AllUsers /> } />
        </Routes>
    )
}

export default RoutesComponent;