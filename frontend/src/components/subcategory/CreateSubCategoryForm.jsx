import React from 'react'
import { Controller, useForm } from 'react-hook-form';
import SelectBox from '../inputs/SelectBox';
import Input from '../inputs/Input';
import { readImg } from "../../utils/Utils";

export default function CreateSubCategoryForm({
    onSubmit,
    productCategories,
}) {
    const {
        register,
        control,
        setValue,
        handleSubmit,
        watch,
        reset: resetForm,
        formState: { errors }
    } = useForm({
        defaultValues: {
            id: '',
            nameTh: '',
            nameEn: '',
            image: '',
            isActive: true,
            productCategoryId: '',
            textureIds: '',
        },
    });

    const onAvatarChange = async e => {
        const [file = null] = e.target.files;
        return setValue('avatar', !file ? '' : await readImg(file));
        // setValue()
    }
    return (
        <form onSubmit={handleSubmit(data => onSubmit(data, resetForm))}>
            <div className="flex flex-col mb-3">
                <label htmlFor="text" className="mb-2">หมวดหมู่ย่อยสินค้า</label>
                <Controller
                    name="nameTh"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { onChange, value } }) => (
                        <Input type="text" onChange={onChange} value={value} placeholder="ระบุชื่อหมวดหมู่ย่อยสินค้า " />
                    )}
                />
                {errors.nameTh && <p className="text-red-600 my-2">กรุณากรอกหมวดหมู่ย่อย</p>}
            </div>
            <div className="flex flex-col mb-3">
                <label htmlFor="text" className="mb-2">หมวดหมู่ย่อยสินค้า (ภาษาอังกฤษ) </label>
                <Controller
                    name="nameEn"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { onChange, value } }) => (
                        <Input type="text" onChange={onChange} value={value} placeholder="ระบุชื่อหมวดหมู่ย่อยสินค้า (ภาษาอังกฤษ)" />
                    )}
                />
                {errors.nameEn && <p className="text-red-600 my-2">กรุณากรอกหมวดหมู่ย่อย (ภาษาอังกฤษ)</p>}
            </div>

            <div className="flex flex-col mb-3">
                <label htmlFor="edit-productCategory" className="mb-2">ประเภทผลิตภัณฑ์ <small className="text-red-600">*</small></label>
                <Controller
                    name="productCategoryId"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { onChange, value } }) => (
                        <SelectBox onChange={onChange} required value={value}>
                            <option value=''>โปรดเลือก</option>
                            {productCategories.map(item => (
                                <option className="text-black" key={item.id} value={item.id}>{item.nameTh}</option>
                            ))}
                        </SelectBox>
                    )}
                />
                {errors.productCategoryId && <p className="text-red-600 my-2">กรุณาเลือกประเภทผลิตภัณฑ์</p>}
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
            <div className="flex flex-col mb-3">
                <label htmlFor="text" className="mb-2">รูปภาพ</label>
                <Input type="file" accept="image/*" onChange={onAvatarChange} />
                {errors.image && <p className="text-red-600 my-2">โปรดระบุรูปภาพ</p>}
            </div>

            <div className="mt-6 text-center">
                <button type="submit" className="w-full px-4 py-2 font-bold text-white bg-blue-600 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline">
                    <i className="far fa-save mr-2"></i>
                    <span>บันทึกข้อมูล</span>
                </button>
            </div>
        </form>
    )
}
