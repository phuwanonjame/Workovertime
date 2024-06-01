import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import axios from 'axios';
import Login from './component/login';
import Home from './component/home';
import Navbar from './component/Navbar';

interface User {
  Firstname: string;
  Lastname: string;
}

function App() {
  const [data1, setData] = useState<User[]>([]);
  const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
 

  useEffect(() => {
    const LoadData = async () => {
      try {
        const response = await axios.get(`https://serverworkot.onrender.com/User`, {
          params: { IDuser: 1 }, 
        });
        setData(response.data);
        console.log("Loaded Data:", response.data);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    if (!isLoggedIn || isLoggedIn) {
      LoadData();
    }
  }, [isLoggedIn]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/home"
          element={
            !isLoggedIn || isLoggedIn ? (
              <>
                <Navbar data={data1} />
                <Home data={data1} />
              </>
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
