import React, { useEffect, useState } from 'react'
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { readImg } from '../../utils/Utils';
import Input from '../inputs/Input';
import SelectBox from '../inputs/SelectBox';

export default function EditPackageForm({
    onSubmit,
    defaultData,
}) {
    const [formDisabled, setFormDisable] = useState(false);
    const {
        control,
        setValue,
        handleSubmit,
        watch,
        reset: resetForm,
        formState: { errors }
    } = useForm({
        defaultValues: {
            id: '',
            image: '',
            nameTh: '',
            nameEn: '',
            minDosage: '',
            maxDosage: '',
            price: '',
            isActive: true,
        },
    });

    const onAvatarChange = async e => {
        const [file = null] = e.target.files;
        return setValue('avatar', !file ? '' : await readImg(file));
        // setValue()
    }
    useEffect(() => {
        if (defaultData) {
            setFormDisable(false);
            for (const [key, value] of Object.entries(defaultData)) {
                switch (key) {
                    default: setValue(key, value);
                }
            }
        } else {
            resetForm();
            setFormDisable(true);
        }
    }, [defaultData]);

    return (
        <form onSubmit={handleSubmit(data => onSubmit(data, resetForm))}>
            <fieldset disabled={formDisabled}>
            <div className="flex flex-col mb-3">
                <label htmlFor="text" className="mb-2">ชื่อบรรจุภัณฑ์</label>
                <Controller
                    name="nameTh"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { onChange, value } }) => (
                        <Input type="text" onChange={onChange} value={value} placeholder="ระบุชื่อบรรจุภัณฑ์" />
                    )}
                />
                {errors.nameTh && <p className="text-red-600 my-2">กรุณากรอกบรรจุภัณฑ์</p>}

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                <div className="flex flex-col mb-3">
                    <label htmlFor="text" className="mb-2">ราคาบรรจุภัณฑ์</label>
                    <Controller
                        name="price"
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { onChange, value } }) => (
                            <Input type="text" onChange={onChange} value={value} placeholder="ระบุราคาบรรจุภัณฑ์" />
                        )}
                    />
                    {errors.price && <p className="text-red-600 my-2">กรุณากรอกราคาบรรจุภัณฑ์</p>}

                </div>
                <div className="flex flex-col mb-3">
                    <label htmlFor="text" className="mb-2">ราคา(กล่อง)บรรจุภัณฑ์</label>
                    <Controller
                        name="cartonPrice"
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { onChange, value } }) => (
                            <Input type="text" onChange={onChange} value={value} placeholder="ระบุราคากล่อง" />
                        )}
                    />
                    {errors.cartonPrice && <p className="text-red-600 my-2">กรุณากรอกราคา(กล่อง)บรรจุภัณฑ์</p>}

                </div>
                <div className="flex flex-col mb-3">
                    <label htmlFor="text" className="mb-2">ปริมาณบรรจุต่ำสุด (มล.)</label>
                    <Controller
                        name="minDosage"
                        control={control}
                        rules={{ required: true, minLength: 1, min: 0, }}
                        render={({ field: { onChange, value } }) => (
                            <Input type="number" onChange={onChange} value={value} min={0} placeholder="ระบุปริมาณบรรจุต่ำสุด (มล.)" />
                        )}
                    />
                    {errors.minDosage && <p className="text-red-600 my-2">กรุณากรอกปริมาณบรรจุต่ำสุด</p>}

                </div>
                <div className="flex flex-col mb-3">
                    <label htmlFor="text" className="mb-2">ปริมาณบรรจุสูงสุด (มล.)</label>
                    <Controller
                        name="maxDosage"
                        control={control}
                        rules={{ required: true, minLength: 1, min: 0, }}
                        render={({ field: { onChange, value } }) => (
                            <Input type="number" onChange={onChange} value={value} min={0} placeholder="ระบุปริมาณบรรจุสูงสุด (มล.)" />
                        )}
                    />
                    {errors.maxDosage && <p className="text-red-600 my-2">กรุณากรอกปริมาณบรรจุสูงสุด</p>}

                </div>
            </div>
            <div className="flex flex-col mb-6">
                <label htmlFor="text" className="mb-2">สถานะ</label>
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
            <div className="mb-6 flex flex-col">
                <label className="">รูปภาพ</label>
                <Input type="file" accept="image/*" onChange={onAvatarChange} />
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
