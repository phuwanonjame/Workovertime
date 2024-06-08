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
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(sessionStorage.getItem('isLoggedIn') === 'true');
  const userData = sessionStorage.getItem('userData');
  const userID = userData ? JSON.parse(userData)[0].ID_user : null;

  useEffect(() => {
    const LoadData = async () => {
      if (userID !== null) {
        try {
          const response = await axios.get(`https://serverworkot.onrender.com/User`, {
            params: { IDuser: userID },
          });
          setData(response.data);
          console.log("Loaded Data:", response.data);
        } catch (error) {
          console.error("Error loading data:", error);
        }
      }
    };

    if (isLoggedIn) {
      LoadData();
    }
  }, [isLoggedIn, userID]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route
          path="/home"
          element={
            isLoggedIn ? (
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
