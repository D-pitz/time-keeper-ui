import React, { useContext, useState } from 'react';
import './App.css';
import { UserConsumer, UserContext, UserProvider } from './Context/UserContext';
import "bootstrap/dist/css/bootstrap.min.css";
import Nav from "./Components/Nav/Nav"
import RoutesComponent from './routes/Routes';


const App = () => {
  console.log(process.env.REACT_APP_API_URL)
  return (
    <div className='Background'>
      <UserProvider>
        <Nav />
        <RoutesComponent />
      </UserProvider>
    </div>
  );
}

export default App;

