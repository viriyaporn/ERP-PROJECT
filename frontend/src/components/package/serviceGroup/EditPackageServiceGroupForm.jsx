import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import Input from '../../inputs/Input';
import SelectBox from '../../inputs/SelectBox';

export default function EditPackageServiceGroupForm({
  onSubmit,
  defaultData,
}) {
  const [formDisabled, setFormDisable] = useState(true);
  const {
    control,
    handleSubmit,
    setValue,
    reset: resetForm,
    formState: { errors }
  } = useForm({
    defaultValues: {
      id: '',
      nameTh: '',
      nameEn: '',
      isActive: true,
    },
  });

  useEffect(() => {
    if (defaultData) {
      for (const [key, value] of Object.entries(defaultData)) {
        setValue(key, value);
      }
      setFormDisable(false);
    } else {
      resetForm();
      setFormDisable(true);
    }
  }, [defaultData]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset disabled={formDisabled}>
        <div className="flex flex-col mb-5 ">
          <label htmlFor="text" className="mb-2">หมวดหมู่บริการบรรจุภัณฑ์ (ไทย)</label>
          <Controller
            name="nameTh"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <Input type="text" onChange={onChange} value={value} placeholder="ระบุชื่อหมวดหมู่บริการบรรจุภัณฑ์ (ไทย)" />
            )}
          />
          {errors.nameTh && <span className='text-red-500'>กรุณากรอกมวดหมู่บริการบรรจุภัณฑ์</span>}
        </div>
        <div className="flex flex-col mb-5 ">
          <label htmlFor="text" className="mb-2">หมวดหมู่บริการบรรจุภัณฑ์ (อังกฤษ)</label>
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
      </fieldset>
    </form>
  )
}
