import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface LoginProps {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

function Login({ setIsLoggedIn }: LoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  function login() {
    const data = {
      Username: username,
      Password: password,
      Status: 1
    };
    axios.get("http://localhost:3002/User", { params: data })
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data);

          setIsLoggedIn(true);
          navigate("/home");
        } else {
          console.error("เกิดข้อผิดพลาดในการส่งข้อมูล");
        }
      }).catch((error) => {
        console.error("Error loading data:", error);
      });
  }

  return (
    <div className='w-screen h-screen bg-blue-500'>
      <div className='card h-full flex justify-center items-center'>
        <div className='bg-white p-2 rounded-md flex flex-col justify-center items-center gap-4'>
          <div className=''>
            <img className="rounded-md w-[500px] object-cover" src="https://www.metrosystems.co.th/wp-content/uploads/2018/03/hitory4.png" alt="" />
          </div>
          <div className='p-2'>
            <span className='text-2xl'>Metro systems Corporation</span>
            <div className='mt-5 flex flex-col gap-2 justify-center'>
              <input type='text' value={username} placeholder='username' className='bg-slate-200 p-1 rounded-md outline-none' onChange={(e) => setUsername(e.target.value)}></input>
              <input type='password' value={password} placeholder='password' className='bg-slate-200 p-1 rounded-md outline-none' onChange={(e) => setPassword(e.target.value)}></input>
            </div>
          </div>
          <div>
            <button className='p-5 bg-blue-700 w-52 text-white hover:opacity-50 rounded-md' onClick={login}>login</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
