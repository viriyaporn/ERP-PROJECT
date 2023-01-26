import React, { useMemo, useRef, useState } from 'react'
import Layout from '../../layouts/Layout'

import { ReportMockup } from '../../mockup/Report'
import ReportDetail from './DetailReport'
import { AiOutlineCaretDown } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

export default function DetailReport() {
  const gridRef = useRef();
  const [state, setState] = useState({ perPage: 10 });
  const navigate = useNavigate();

  return (
    <>
      <Layout>
        <div className="flex justify-between p-2 bg-slate-300">
          <h2 className="font-bold text-2xl mb-5 ">ประวัติการส่งอุปกรร์การแพทย์</h2>
        </div>
        <div className='border-2 '>
          {ReportMockup.map((item, i) => {
            return (
              <>
                <div className='border-2 rounded-lg m-5'>
                  <div key={item.Id} className='flex flex-col p-5  '>
                    <p>ชื่อผู้ส่ง        : {item.Name}</p>
                    <p>วันที่ส่ง        : {item.Date}</p>
                    <p>หมายเหตุ      : {item.Note}</p>
                    <p>อุปกรณ์ที่ส่ง    : {i + 1}. {item.Devide[i].Name_Devide[i].Detail} จำนวน {item.Devide[i].Name_Devide[i].Number} ชิ้น</p>
                    <p>ตรวจสอบสถานะ : <button type='submit' onClick={() => setState(prev => !prev)}><AiOutlineCaretDown /></button></p>
                    <div className={`${state ? "hidden" : "block"} `} aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex="-1">
                      <ReportDetail />
                    </div>
                  </div>
                </div>
              </>
            )
          }
          )}
          {/* <p>ตรวจสอบสถานะ : <button type='submit' onClick={() => setState(prev => !prev)}><AiOutlineCaretDown /></button>
            </p> */}

        </div>
        <div>

        </div>
      </Layout>
    </>

  )
}

