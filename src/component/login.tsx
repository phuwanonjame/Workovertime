import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Swal = require('sweetalert2');

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
    Swal.fire({
      title: 'กำลังเข้าสู่ระบบ...',
      text: 'ระบบกำลังตรวจสอบจากฐานข้อมูล..',
      allowOutsideClick: false,
      showConfirmButton: false,   
      didOpen: () => {
        Swal.showLoading();
      }
    });
    axios.get("https://serverworkot.onrender.com/User", { params: data })
      .then((response) => { 
        if (response.status === 200) {
          Swal.close();
          console.log("Login successful:", response.data);
          sessionStorage.setItem('isLoggedIn', 'true');
          sessionStorage.setItem('userData', JSON.stringify(response.data));
          setIsLoggedIn(true); // Update the state to reflect login status
          navigate("/home", { state: { userData: response.data } });
        } else if (response.status === 404) {
          console.error("Login failed with status:", response.status);
          Swal.fire({
            icon: 'error',
            title: 'การเข้าสู่ระบบล้มเหลว',
            text: 'กรุณาตรวจสอบชื่อผู้ใช้และรหัสผ่านอีกครั้ง'
          });
        }
      }).catch((error) => {
        console.error("Error during login:", error);
        Swal.fire({
          icon: 'error',
          title: 'เกิดข้อผิดพลาด',
          text: 'ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้ กรุณาลองใหม่อีกครั้ง'
        });
      });
  }

  return (
    <div className='w-screen h-screen bg-blue-500'>
      <div className='card h-full flex justify-center items-center'>
        <div className='bg-white shadow-md p-2 rounded-md flex flex-col justify-center items-center gap-4'>
          <div className=''>
            <img className="rounded-md w-[500px] object-cover" src="https://www.metrosystems.co.th/wp-content/uploads/2018/03/hitory4.png" alt="" />
          </div>
          <div className='p-2'>
            <span className='text-2xl'>Metro Systems Corporation Plc.</span>
            <div className='mt-5 flex flex-col gap-2 justify-center'>
              <input type='text' value={username} placeholder='username' className='bg-slate-200 p-1 rounded-md outline-none' onChange={(e) => setUsername(e.target.value)}></input>
              <input type='password' value={password} placeholder='password' className='bg-slate-200 p-1 rounded-md outline-none' onChange={(e) => setPassword(e.target.value)}></input>
            </div>
          </div>
          <div>
            <button className='p-5 bg-blue-700 shadow-md w-52 text-white hover:opacity-50 rounded-md' onClick={login}>Login</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
