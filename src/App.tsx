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
  // Add other user properties if needed
}

function App() {
  const [data1, setData] = useState<User[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const IDuser: number = 1;

  useEffect(() => {
    const LoadData = async () => {
      try {
        const response = await axios.get(`http://localhost:3002/User`, {
          params: { IDuser }
        });
        setData(response.data);
        console.table("Loaded Data:", response.data);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };
    LoadData();
  }, []);

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
