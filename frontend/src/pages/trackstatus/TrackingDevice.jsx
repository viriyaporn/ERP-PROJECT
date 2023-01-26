import React, { useMemo, useRef, useState } from 'react'
import Layout from '../../layouts/Layout'
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

import useApiService from '../../hooks/useApiService';
import useLazyApiService from '../../hooks/useLazyApiService';
import { Audit } from '../../mockup/Audit';
import { Cleansing } from '../../mockup/Cleansing';
import { dateTimeToThaiString } from '../../utils/Utils';
import { getDashboardSummary } from '../../services/DashboardService';
import { getCalcResultById } from '../../services/CalcResultService';
import { ExportTrack } from '../../mockup/ExportTrack';
import Input from "../../components/inputs/Input";
import Modal from "../../components/Modal";
import Swal from "sweetalert2";
import SelectBox from "../../components/inputs/SelectBox";
import { AiFillEye, AiFillEdit, AiFillDelete } from 'react-icons/ai';
import CreateSendDeviceForm from '../../components/trackStatus/CreateSendDeviceForm';
import EditSendDeviceForm from '../../components/trackStatus/EditSendDeviceForm';
import { useNavigate } from 'react-router-dom';


export default function TrackingDevice() {
  const gridRef = useRef();
  const navigate = useNavigate();

  const [state, setState] = useState({ perPage: 10 });
  const [viewModalVisible, setViewModalVisibility] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [editModalVisible, setEditModalVisibility] = useState(false);
  // var count = 1;
  // const { data: packages } = useApiService(getAllPackages, { defaultValues: [] });
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
          <button type="button" onClick={() => navigate('/trackstatus/tracking-detail')} className="rounded text-center text-blue-400 hover:text-blue-500"><AiFillEye className='text-xl' /></button>
          {/* <button type="button" onClick={() => onEditBtnClick(info)} className="rounded text-orange-400 hover:text-orange-500"><AiFillEdit className='text-xl' /></button> */}
          {/* <button type="button" onClick={() => onDeleteBtnClick(info)} className="rounded text-red-500 hover:text-red-600"><AiFillDelete className='text-xl' /></button> */}
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

  const onViewEfficaciesBtnClick = info => {
    fetchProduct(info.data.id);
    setViewModalVisibility(true);
  }
  const onEditBtnClick = info =>
    // .then(res => setEditData(res.data))
    setEditModalVisibility(true)

  const onDeleteBtnClick = async info => {
    try {
      const swal = await Swal.fire({
        title: 'ลบอุปกรณ์',
        text: "คุณต้องการลบอุปกรณ์ใช่หรือไม่ หากยืนยันการลบแล้ว คุณจะไม่สามารถกู้คืนอุปกรณ์นี้ได้อีกต่อไป",
        icon: 'warning',
        denyButtonText: 'ยกเลิก',
        denyButtonColor: 'red',
        showDenyButton: true,
        focusDeny: true,
        confirmButtonText: 'ยืนยันลบ',
      });

      if (!swal.isConfirmed) return;

      const { data: { id } } = info;
      if (!id) throw { message: 'กรุณาระบุอุปกรณ์' };

      await deleteProduct(id);
      Swal.fire('สำเร็จ', 'ลบอุปกรณ์เรียบร้อย', 'success');

      refetchProducts();
    } catch (err) {
      console.error('onSubmitCreateForm ERROR:', err);
      return Swal.fire('ขออภัย', err?.message || "ไม่สามารถลบอุปกรณ์ได้", 'error');
    }
  }


  const onSubmitEditForm = async info => {
    try {
      const { id: productId, ...productData } = info;
      await updateProductById(productId, productData);

      Swal.fire('สำเร็จ', 'แก้ไขข้อมูลอุปกรณ์เรียบร้อย', 'success');

      refetchProducts();
    } catch (err) {
      console.error('onSubmitEditForm ERROR:', err);
      return Swal.fire('ขออภัยedit', err?.message || "ไม่สามารถดำเนินการได้", 'error');
    }
  }

  const onSubmitCreateForm = async (data, resetForm) => {
    try {
      await createProduct(data);
      Swal.fire('สำเร็จ', 'เพิ่มอุปกรณ์เรียบร้อย', 'success');
      resetForm();

      // refetchProducts();

    } catch (err) {
      console.error('onSubmitCreateForm ERROR:', err);
      return Swal.fire('ขออภัย', err?.message || "ไม่สามารถเพิ่มอุปกรณ์ได้", 'error');
    }
  }

  const onFilterTextBoxChanged = (e) => {
    gridRef.current.api.setQuickFilter(e.target.value)
  }
  return (
    <>
      <Layout >
        <div className="flex justify-between p-2">
          <h1 className="font-bold text-3xl mb-5">ข้อมูลการนำส่งอุปกรณ์ฆ่าเชื้อ</h1>
          <div>
            <button
              type="button"
              className="rounded-r-full rounded-l-full text-sm px-4 py-2 bg-blue-700 hover:bg-blue-900 text-white"
              onClick={() => setAddModal(true)}
            >
              <i className="fas fa-plus mr-1"></i>
              <span>เพิ่มการนำส่งอุปกรณ์</span>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="flex space-x-3 mb-3 mr-auto">
            <label className="my-auto" htmlFor="per-page-input">แสดง</label>
            <SelectBox className="w-[100px]" value={state.perPage} onChange={e => {
              setState(prev => ({ ...prev, perPage: e.target.value }))
              gridRef.current.api.paginationSetPageSize(Number(e.target.value));
            }}>
              <option>10</option>
              <option>20</option>
              <option>50</option>
              <option>100</option>
            </SelectBox>
            <span className="my-auto">รายการ</span>
          </div>
          <div className="flex space-x-3 mb-3 ml-auto">
            <label htmlFor="quick-search-input" className="my-auto">ค้นหา</label>
            <Input
              id="quick-search-input"
              onInput={onFilterTextBoxChanged}
              className="max-w-xs border-2"
            />
          </div>
        </div>
        <div className="ag-theme-alpine h-[69vh]">
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
      </Layout>

      {/* <Modal
        size="6xl"
        title="ข้อมูลรายละเอียดอุปกรณ์"
        body={<ProductDetail data={product} />}
        modalBodyClassName="p-6 space-y-6 dark:text-white"
        isVisible={viewModalVisible}
        setVisiblility={setViewModalVisibility}
      /> */}

      <Modal
        title="เพิ่มการนำส่งอุปกรณ์"
        body={
          <CreateSendDeviceForm
            onSubmit={onSubmitCreateForm}
          />}
        modalBodyClassName="p-6 space-y-6 dark:text-white"
        isVisible={addModal}
        // efficacies={efficacies}
        setVisiblility={setAddModal}
      />
      {/* 
      <Modal
        title="แก้ไขข้อมูลการนำส่งอุปกรณ์"
        isVisible={editModalVisible}
        setVisiblility={setEditModalVisibility}
        body={
          <EditSendDeviceForm
            onSubmit={onSubmitEditForm}
            defaultData={editData}
            // efficacies={efficacies}
          />
        }
        // onHidden={() => setEditData(null)}
      /> */}

      {/* <Modal
        size="6xl"
        title="ข้อมูลรายละเอียดผลิตภัณฑ์"
        body={<TrackStatusDetail data={product} />}
        modalBodyClassName="p-6 space-y-6 dark:text-white"
        isVisible={viewModalVisible}
        setVisiblility={setViewModalVisibility}
      /> */}
    </>
  )
}
