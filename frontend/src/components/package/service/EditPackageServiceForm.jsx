import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import Input from '../../inputs/Input';
import SelectBox from '../../inputs/SelectBox';

export default function EditPackageServiceForm({
  onSubmit,
  defaultData,
  packageServiceGroups,
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
      packageServiceGroupId: '',
      price: '',
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
        <div className="flex flex-col mb-3">
          <label htmlFor="text" className="mb-2">บริการเสริมของบรรจุภัณฑ์</label>
          <Controller
            name="nameTh"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <Input type="text" onChange={onChange} value={value} placeholder="ระบุชื่อบริการพิเศษ" />
            )}
          />
          {errors.nameTh && <span className='text-red-500'>nameTh ไม่ถูกต้อง</span>}
        </div>
        <div className="flex flex-col mb-3">
          <label htmlFor="text" className="mb-2">บริการเสริมของบรรจุภัณฑ์</label>
          <Controller
            name="nameEn"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <Input type="text" onChange={onChange} value={value} placeholder="ระบุชื่อบริการพิเศษ" />
            )}
          />
          {errors.nameEn && <span className='text-red-500'>nameEn ไม่ถูกต้อง</span>}
        </div>
        <div className="flex flex-col mb-3">
          <label htmlFor="text" className="mb-2">ราคา</label>
          <Controller
            name="price"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <Input type="text" onChange={onChange} value={value} placeholder="ระบุราคา" />
            )}
          />
          {errors.price && <span className='text-red-500'>price ไม่ถูกต้อง</span>}
        </div>
        <div className="mb-3 flex flex-col">
          <label htmlFor="edit-packageServiceGroupId" className="mb-2">หมวดหมู่บริการบรรจุภัณฑ์ <small className="text-red-600">*</small></label>
          <Controller
            name="packageServiceGroupId"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <SelectBox onChange={onChange} required value={value} >
                <option value=''>โปรดเลือก</option>
                {packageServiceGroups.map(item => (
                  <option className="text-black" key={item.id} value={item.id}>{item.nameTh}</option>
                ))}
              </SelectBox>
            )}
          />
          {errors.packageServiceGroupId && <p className="text-red-500 mb-3">packageServiceGroupId ไม่ถูกต้อง</p>}
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
          {errors.isActive && <span className='text-red-500'>isActive ไม่ถูกต้อง</span>}
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
