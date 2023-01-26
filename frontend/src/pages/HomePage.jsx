import React from 'react'
import { Link } from 'react-router-dom'
// import '../assets/css/homePage.css';

export default function HomePage() {
  return (
    <>
      <div className="flex flex-col justify-center items-center align-middle text-center">
        <h1>
          <span className="block text-4xl md:text-5xl max-w-xl text-blue-500 drop-shadow-lg font-bold tracking-widest">สำนักงานสาธารณสุขอำเภอบ้านโพธิ์</span>
        </h1>
        <p>
          <span className="block text-sky-500">จังหวัดฉะเชิงเทรา</span>
        </p>
        <div className='grid grid-cols-2 gap-10 w-[850px] h-[450px]'>
          <div className=" border-2 justify-center">
            <Link to="trackstatus/login-track" className="p-5 bg-success font-bold cursor-pointer rounded-xl">
              <span className="mr-2">การติดตามกระบวนการฆ่าเชื้อ</span>
              <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </div>
          <div className=" border-2 p-5 w-75">
            <Link to="Login-Doc" className="p-5 bg-success font-bold cursor-pointer rounded-md">
              <span className="mr-2">งานสารบรรณ</span>
              <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
