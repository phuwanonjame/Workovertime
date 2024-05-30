import React from 'react';

function Navbar({ data }: { data: any[] }) {
    return (
        <div className='w-screen h-20 bg-blue-800'>
            <div className='h-full'>
                <div className='h-full flex justify-between items-center'>
                    <div className='ml-5'>
                        <img src="https://www.metrosystems.co.th/wp-content/uploads/2023/03/LogoMSC.jpg" width={100} alt="Logo" />
                    </div>
                    <div className='mr-5'>
                        {data.length > 0 ? (
                            <span className='text-xl text-white'>{`${data[0].Firstname} ${data[0].Lastname}`}</span>
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
