import React from 'react'
import { Navigate } from 'react-router-dom'
import { GrNext } from 'react-icons/gr';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { TrackDevide } from '../../mockup/TrackDevide';
import { PhotoMokup } from '../../mockup/PhotoMockup';
import Layout from '../../layouts/Layout';

export default function ReportDetail() {
  return (
    <>
      {/* <Layout> */}
        <div className="flex justify-between p-2 bg-slate-300">
          <h2 className="font-bold text-2xl mb-5 ">ตรวจสอบสถานะของอุปกรณ์การแพทย์</h2>
          {/* <button
          type="button"
          className="rounded-lg flex flex-row justify-center self-center text-lg px-4 py-2 bg-blue-700 hover:bg-blue-900 text-white"
          onClick={() => Navigate('/tracking-device')}
        >
          <IoMdArrowRoundBack className='mr-3 justify-center self-center' />
          <span>ย้อนกลับ</span>
        </button> */}
        </div>
        <div className='border-2 '>
          {TrackDevide.map((item, i) => {
            return (
              <>
                <div className='border-2 rounded-lg m-5'>
                  <div key={item.Id} className='flex flex-row justify-between item-center p-5  '>
                    <p>
                      ลำดับที่ {i + 1} {item.NameDevide}
                    </p>
                    <p>
                      {(item.Date)}
                    </p>
                  </div>

                  <div className='grid grid-grow item-center text-center justify-center grid-cols-5 mt-10 ml-5'>
                    {
                      PhotoMokup.map((photo =>
                        <>
                          <div key={photo.Id} className='flex flex-row text-center justify-center'>
                            <div className='flex flex-col'>
                              <img src={photo.image} className='rounded-full w-[120px] bg-cover' />
                              <p>{photo.Title}</p>
                            </div>
                            {(photo.Id < 5) && <GrNext className='ml-[80px] self-center' />}

                          </div>
                        </>
                      ))
                    }
                    <div>
                      <ol className="relative text-left border-l border-gray-200 dark:border-gray-700 mt-10">
                        <li className="mb-10 ml-4">
                          <div className="absolute w-3 h-3  bg-gray-200 rounded-full -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700" />

                          <time className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">{item.StatusDevide[i].Date}</time>
                          <h3 className="mt-4 text-base font-normal text-gray-500 dark:text-black-400">{item.StatusDevide[i].status_Devide}</h3>
                          <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">{item.StatusDevide[i].Hospital}</p>
                          <p className="mb-3 text-base font-normal text-gray-500 dark:text-gray-400">{item.StatusDevide[i].note}</p>

                        </li>
                      </ol>
                    </div>
                  </div>
                </div>
              </>
            )
          }
          )}
        </div>
      {/* </Layout> */}
    </>
  )
}
