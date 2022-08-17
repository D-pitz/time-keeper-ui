import React from 'react';
import {Routes, Route} from "react-router-dom"
import Login from '../Components/Login/Login';
import Register from '../Components/Register/Register';

const RoutesComponent = () => {
    return (
        <Routes>
            <Route path="/" element = { <Login /> } />
            <Route path="/login" element = { <Login /> } />
            <Route path="/register" element = { <Register /> } />
        </Routes>
    )
}

export default RoutesComponent;