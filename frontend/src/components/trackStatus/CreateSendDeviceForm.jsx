import React, { useEffect, useState } from 'react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { readImg } from '../../utils/Utils'
import Input from '../inputs/Input'
import SelectBox from '../inputs/SelectBox'
import TextArea from '../inputs/TextArea'
import Button from '../Button'

import { FiTrash2 } from 'react-icons/fi';

export default React.memo(function CreateSendDeviceForm({
  onSubmit,
}) {
  const {
    register,
    control,
    setValue,
    watch,
    handleSubmit,
    reset: resetForm,
    formState: { errors }
  } = useForm({
    defaultValues: {
      nameDevide: '',
      description: [],
      number: '',
      formAddDevide: [],
      note: '',
    },
  });

  const { fields, append, remove } = useFieldArray({ name: 'formAddDevide', control })
  // const [currentRadioValue, setCurrentValue] = useState('on');


  return (
    <form onSubmit={handleSubmit(data => onSubmit(data, resetForm))}>
      <div>
        <div className={`flex ${fields.length ? 'mb-3' : ''}`}>
          {/* <h3 className='text-xl'>xx</h3> */}
          <Button
            type='button'
            label={() => <><i className='fas fa-plus mr-1' />เพิ่มรายการ</>}
            variant='info'
            className="ml-auto rounded"
            onClick={e => append({ nameDevide: '', number: '', note: '' })}
          />
        </div>

        <div className="mb-3 flex flex-col">
          <label htmlFor="text" className="mb-2 ">ชื่ออุปกรณ์</label>
          <Controller
            name="nameDevide"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <Input type="text" onChange={onChange} value={value} placeholder="ระบุชื่ออุปกรณ์" />
            )}
          />
          {/* {errors.nameDevide && <span className="text-red-500 mb-3">ชื่ออุปกรณ์ไม่ถูกต้อง</span>} */}
        </div>

        <div className="flex flex-col mb-3">
          <label htmlFor="text" className="mb-2">จำนวนอุปกรณ์</label>
          <Controller
            name="number"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <Input type="text" onChange={onChange} value={value} placeholder="ระบุจำนวนอุปกรณ์" />
            )}
          />
          {errors.number && <p className="text-red-600 my-2">กรุณาจำนวนอุปกรณ์</p>}
        </div>

        <div className="mb-3 flex flex-col">
          <label htmlFor="text" className="mb-2 ">หมายเหตุ</label>
          <Controller
            name="note"
            control={control}
            rules={{ required: false }}
            render={({ field: { onChange, value } }) => (
              <TextArea onChange={onChange} value={value} placeholder="ระบุหมายเหตุ (ถ้ามี)" />
            )}
          />
          {errors.taglineTh && <span className="text-red-500 mb-3">taglineTh ไม่ถูกต้อง</span>}
        </div>

        {fields.map((addFormDevide, index) => (
          <div key={addFormDevide.id} >
            <br />
            <hr />
            <br />
            <div className="flex-grow">
              <label className='block mb-2'>ชื่ออุปกรณ์</label>
              <Controller
                name={`nameDevide.${index}`}
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, value } }) => (
                  <Input type="text" onChange={onChange} value={value} placeholder="ระบุชื่ออุปกรณ์" />
                )}
              />
              {errors.nameDevide && <span className="text-red-500 mb-3">ชื่ออุปกรณ์ไม่ถูกต้อง</span>}
            </div>
            <div className="flex-grow">
              <label className='block mb-2'>จำนวนอุปกรณ์</label>
              <Controller
                name={`number.${index}`}
                control={control}
                rules={{
                  required: true,

                }}
                render={({ field: { onChange, value } }) => (
                  <Input type="number" onChange={onChange} value={value} placeholder="ระบุจำนวนอุปกรณ์" />
                )}
              />
              {errors.number && <p className="text-red-600 my-2">กรุณาจำนวนอุปกรณ์</p>}

            </div>

            <div className="flex-grow">
              <label className='block mb-2'>หมายเหตุ</label>
              <Controller
                name={`note.${index}`}
                control={control}
                rules={{
                  required: false,
                  // max: index === 0 ? watchPrice : watchaddFormDevides[index - 1].price,
                  // minLength: 1,
                }}
                render={({ field: { onChange, value } }) => (
                  <TextArea className="flex w-full" onChange={onChange} value={value} placeholder="ระบุหมายเหตุ (ถ้ามี)" />
                )}
              />
              {errors.note && <p className="text-red-600 my-2">กรุณาระบุหมายเหตุ</p>}
            </div>

            {(index >= 0) &&
              <Button
                variant='danger'
                className="flex text-right mt-3 rounded-lg mb-3"
                label={() => <FiTrash2 />}
                onClick={() => remove(index)}
              />}

          </div>
        ))}


      </div>
      <div className="mb-3 text-center">
        <button type="submit" className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline">
          <i className="far fa-save"></i>  บันทึกข้อมูล
        </button>
      </div>
    </form>
  )
})
