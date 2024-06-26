import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar({ data }: { data: any[] }) {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.clear();
     
        navigate('/');
    };

    return (
        <div className='w-screen h-20 bg-blue-800'>
            <div className='h-full'>
                <div className='h-full flex justify-between items-center'>
                    <div className='ml-5'>
                        <img src="https://www.metrosystems.co.th/wp-content/uploads/2023/03/LogoMSC.jpg" width={100} alt="Logo" />
                    </div>
                    <div className='mr-5'>
                        {data.length > 0 ? (
                            <div>
                                <span onClick={() => setOpen(!open)} className='text-xl text-white hover:cursor-pointer'>
                                    {`${data[0].Firstname} ${data[0].Lastname}`}
                                </span>
                                {open && (
                                    <div className='relative'>
                                        <div className='text-center rounded-md h-22 hover:cursor-pointer bg-white' onClick={handleLogout}>
                                            <span  className=''>Logout</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <span className='text-xl text-white'>Loading...</span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
