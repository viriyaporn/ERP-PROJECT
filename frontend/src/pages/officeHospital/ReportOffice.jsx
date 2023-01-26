import React, { useMemo, useRef, useState } from 'react'
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import BarChart from "../../components/chart/BarChart";
import LineChart from "../../components/chart/LineChart";
import useApiService from "../../hooks/useApiService";
import { getAllCalcResult, getCalcResultById } from "../../services/CalcResultService";
import useLazyApiService from "../../hooks/useLazyApiService";
import { getDashboardSummary } from "../../services/DashboardService";
import { Link } from "react-router-dom";
import { dateTimeToThaiString, numberFormat } from '../../utils/Utils';
import { ExportTrack } from '../../mockup/ExportTrack';
import { AiFillEye, AiFillEdit, AiFillDelete } from 'react-icons/ai';
import LayoutOffice from '../../layouts/LayoutOffice';


export default function ReportOffice() {
  // const { data: rowData, errors, refetch: refetchCalcResult } = useApiService(getDashboardSummary, { defaultValues: {} });

  // const [fetchCalcResult, calcResult] = useLazyApiService(getCalcResultById);
  const gridRef = useRef();

  const [state, setState] = useState({ perPage: 10 });
  const [viewModalVisible, setViewModalVisibility] = useState(false);
  const rowData = useMemo(() => ExportTrack, []);
  const defaultColDef = useMemo(() => ({ resizable: true, sortable: true }), []);
  const columnDefs = useMemo(() => [

    { field: 'Id', headerName: 'ลำดับที่', width: 100, filter: true },
    {
      field: 'Date',
      headerName: 'วันที่ส่ง',
      filter: true,
      // width: 220,
      cellRenderer: info => info.value ? dateTimeToThaiString(new Date(info.value)) : '',
    },
    { field: 'Name', headerName: 'อุปกรณ์', filter: true },
    { field: 'Number', headerName: 'จำนวน', filter: true },
    { field: 'Status', headerName: 'สถานะ', filter: true, width: 140 },
    {
      field: '#',
      filter: false,
      sortable: false,
      pinned: 'left',
      width: 100,
      cellRenderer: info => (
        <div className="flex space-x-1 justify-center align-center">
          <button type="button" onClick={() => navigate('/tracking-detail')} className="rounded text-center text-blue-400 hover:text-blue-500"><AiFillEye className='text-xl' /></button>
          <button type="button" onClick={() => onEditBtnClick(info)} className="rounded text-orange-400 hover:text-orange-500"><AiFillEdit className='text-xl' /></button>
          <button type="button" onClick={() => onDeleteBtnClick(info)} className="rounded text-red-500 hover:text-red-600"><AiFillDelete className='text-xl' /></button>
        </div>
      )
    },
  ], []);


  const onGridReady = e => {
    e.columnApi.applyColumnState({
      state: [{
        colId: 'id',
        sort: 'desc'
      }]
    })
  }

  return (
    <>
      <LayoutOffice>
        <h1 className="font-bold p-2 text-3xl">หน้าแรก</h1>
        {/* Card */}
        <div className="flex flex-glow  mb-2">
          <div className="w-full md:w-1/2 xl:w-1/3 pt-3 px-3 md:pl-2">
            <div className="bg-gradient-to-r from-cyan-500 to-blue-400 rounded-lg shadow p-8 m-2 transition transform hover:scale-110 duration-700 ">
              <div className="flex flex-row items-center">
                <div className="flex-shrink pl-1 pr-4"><i className="fas fa-users fa-2x fa-fw fa-inverse"></i></div>
                <div className="flex-1 text-right">
                  <h5 className="text-white">จำนวนส่งอุปกรณ์ฆ่าเชื้อ</h5>
                  <h3 className="text-white text-3xl">
                    {/* <span className="mr-2">{numberFormat(rowData.userCount ?? 0)}</span> */}
                    <i className="fas fa-caret-up text-blue-400"></i>
                  </h3>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 xl:w-1/3 pt-3 px-3 md:pr-2 xl:pr-3 xl:pl-1">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-lg shadow p-8 m-2 transition transform hover:scale-110 duration-700">
              <div className="flex flex-row items-center">
                <div className="flex-shrink pl-1 pr-4"><i className="fas fa-user-plus fa-2x fa-fw fa-inverse"></i></div>
                <div className="flex-1 text-right pr-1">
                  <h5 className="text-white">อยู่กระบวนการฆ่าเชื้อ</h5>
                  <h3 className="text-white text-3xl">
                    {/* <span className="mr-2">{numberFormat(rowData.brandCalcCount ?? 0)}</span> */}
                    <i className="fas fa-caret-up text-orange-400"></i>
                  </h3>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 xl:w-1/3 pt-3 px-3 md:pr-2 xl:pr-3 xl:pl-1">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-lg shadow p-8 m-2 transition transform hover:scale-110 duration-700">
              <div className="flex flex-row items-center">
                <div className="flex-shrink pl-1 pr-4"><i className="fas fa-user-plus fa-2x fa-fw fa-inverse"></i></div>
                <div className="flex-1 text-right pr-1">
                  <h5 className="text-white">สำเร็จทั้งหมด</h5>
                  <h3 className="text-white text-3xl">
                    {/* <span className="mr-2">{numberFormat(rowData.brandCalcCount ?? 0)}</span> */}
                    <i className="fas fa-caret-up text-orange-400"></i>
                  </h3>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 xl:w-1/3 pt-3 px-3 md:pr-2">
            <div className="bg-gradient-to-r from-lime-500 to-green-500 rounded-lg shadow p-8 m-2 transition transform hover:scale-110 duration-700">
              <div className="flex flex-row items-center">
                <div className="flex-shrink pl-1 pr-4"><i className="fa fa-thin fa-cart-shopping fa-2x fa-fw fa-inverse"></i></div>
                <div className="flex-1 text-right">
                  <h5 className="text-white">Product Balance</h5>
                  <h3 className="text-white text-3xl">
                    {/* <span className="mr-2">{numberFormat(rowData.productCount ?? 0)}</span> */}
                    <i className="fas fa-caret-up text-green-400"></i>
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 mb-6 p-3">
          <div className="bg-neutral-200 p-3 rounded-t-xl">
            <label className="font-bold text-3xl p-2">กราฟ</label>
          </div>
          <div className="border-2 p-2 grid grid-cols-1 lg:grid-cols-2 gap-3 mb-6 drop drop-shadow-xl">
            <div className="drop-shadow-2xl rounded-md">
              <LineChart
                title={'ยอดใช้งานระบบต่อปี'}
                labels={rowData.monthlyGraph?.map?.(item => item.yearMonth) ?? []}
                datasets={[
                  {
                    label: 'จำนวนผู้ใช้ระบบ',
                    data: rowData.monthlyGraph?.map?.(item => item.sum) ?? [],
                    fill: false,
                    backgroundColor: 'rgb(75, 192, 192)',
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1
                  }
                ]}
              />
            </div>
            <div className="">
              <BarChart
                title={'ยอดใช้งานระบบต่อวัน'}
                labels={rowData.dailyGraph?.map?.(item => item.date) ?? []}
                datasets={[
                  {
                    label: 'จำนวนผู้ใช้ระบบ',
                    data: rowData.dailyGraph?.map?.(item => item.sum) ?? [],
                    backgroundColor: [
                      'rgba(255, 205, 86, 0.2)',
                      'rgba(75, 192, 192, 0.2)',
                      'rgba(255, 159, 64, 0.2)',
                      'rgba(54, 162, 235, 0.2)',
                      'rgba(153, 102, 255, 0.2)',
                      'rgba(201, 203, 207, 0.2)',
                      'rgba(255, 99, 132, 0.2)',
                    ],
                    borderColor: [
                      'rgb(255, 205, 86)',
                      'rgb(75, 192, 192)',
                      'rgb(255, 159, 64)',
                      'rgb(54, 162, 235)',
                      'rgb(153, 102, 255)',
                      'rgb(201, 203, 207)',
                      'rgb(255, 99, 132)',
                    ],
                    borderWidth: 1
                  }
                ]}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-between p-2">
          <h1 className="font-bold text-3xl mb-5">ข้อมูลผลการติดตามอุปกรณ์</h1>
          <div>
            <Link to="/tracking-device"
              type="button"
              className="rounded-r-full rounded-l-full text-sm px-6 py-3 bg-cyan-600 hover:bg-cyan-900 text-white"
            >
              <span>ดูข้อมูลทั้งหมด</span>
            </Link>
          </div>
        </div>
        <div className="ag-theme-alpine h-4/5">
          <AgGridReact
            ref={gridRef} // Ref for accessing Grid's API
            rowData={rowData} // Row Data for Rows
            columnDefs={columnDefs} // Column Defs for Columns
            rowModelType="clientSide"
            defaultColDef={defaultColDef}
            pagination={true}
            paginationPageSize={state.perPage}
            onGridReady={onGridReady}
          />
        </div>
      </LayoutOffice>
    </>
  )
}

