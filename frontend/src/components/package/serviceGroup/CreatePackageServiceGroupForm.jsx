import React from 'react'
import { Controller, useForm } from 'react-hook-form';
import Input from '../../inputs/Input';
import SelectBox from '../../inputs/SelectBox';

export default function CreatePackageServiceGroupForm({
  onSubmit,
}) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      id: '',
      nameTh: '',
      nameEn: '',
      isActive: true,
    },
  });

  return (
    <form onSubmit={handleSubmit(data => onSubmit(data, reset))}>
      <div>
        <div className="flex flex-col mb-3">
          <label htmlFor="text" className="mb-2">ชื่อหมวดหมู่บริการบรรจุภัณฑ์ (ไทย)</label>
          <Controller
            name="nameTh"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <Input type="text" onChange={onChange} value={value} placeholder="ระบุชื่อหมวดหมู่บริการบรรจุภัณฑ์ (ไทย)" />
            )}
          />
        {errors.nameTh && <span className='text-red-500'>กรุณากรอกมวดหมู่บริการบรรจุภัณฑ์ </span>}
        </div>
      </div>
      <div>
        <div className="flex flex-col mb-3">
          <label htmlFor="text" className="mb-2">ชื่อหมวดหมู่บริการบรรจุภัณฑ์ (อังกฤษ)</label>
          <Controller
            name="nameEn"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <Input type="text" onChange={onChange} value={value} placeholder="ระบุชื่อหมวดหมู่บริการบรรจุภัณฑ์ (อังกฤษ)" />
            )}
          />
        {errors.nameEn && <span className='text-red-500'>กรุณากรอกมวดหมู่บริการบรรจุภัณฑ์(อังกฤษ) </span>}
          
        </div>
      </div>
      <div className="flex flex-col mb-6">
        <label htmlFor="text" className="">สถานะ</label>
        <Controller
          name="isActive"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <SelectBox onChange={onChange} value={value}>
              <option value={true}>เปิดใช้งาน</option>
              <option value={false}>ปิดใช้งาน</option>
            </SelectBox>
          )}
        />
      </div>
      <div className="mb-3 text-center">
        <button type="submit" className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline">
          <i className="far fa-save"></i>  บันทึกข้อมูล
        </button>
      </div>
    </form>
  )
}
