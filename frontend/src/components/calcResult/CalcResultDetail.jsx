import React from 'react'
import { dateTimeToThaiString, numberFormat } from '../../utils/Utils';

export default React.memo(function CalcResultDetail({
  data,
}) {
  if (!data) return <></>;
  const sum = Object.values(data.summary ?? {}).reduce((acc, item) => acc + item, 0);
  const totalFixedCost = !data.summary ? 0 : data.summary[1] + data.summary[10];
  const totalVariableCost = !data.summary ? 0 : sum - (data.summary[1] + data.summary[10]);
  const costPerPiece = !data.summary ? 0 : totalVariableCost / data.productAmount;
  return (
    <div className='w-full'>
      <div className='overflow-hidden bg-white shadow sm:rounded-lg'>
        <div className='flex justify-between items-start p-4 rounded-t bg-gray-800 '>
          <h3 className='text-lg font-medium leading-6 text-white'>รายละเอียดผลิตภัณฑ์ </h3>
          <span className=' inline-block bg-sky-500 justify-self-stretch px-4 py-1 text-sm font-bold text-white rounded-tl-lg rounded-br-xl'>{data.id} </span>
        </div>
        <div className='border-t border-gray-200 '>
          <dl>
            <div className='bg-gray-50 px-2 py-3 sm:grid sm:grid-cols-3 sm:px-4'>
              <dt className='text-sm font-medium text-gray-500'>วันที่ :</dt>
              <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>{dateTimeToThaiString(new Date(data.createdAt))}</dd>
            </div>
            <div className='bg-white px-2 py-3 sm:grid sm:grid-cols-3 sm:gap-2 sm:px-4'>
              <dt className='text-sm font-medium text-gray-500'>เนื้อผลิตภัณฑ์ :</dt>
              <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>{data.textureNameTh} {data.textureNameEn && <>[ {data.textureNameEn} ]</>}</dd>
            </div>
            <div className='bg-gray-50 px-2 py-3 sm:grid sm:grid-cols-3 sm:gap-2 sm:px-4'>
              <dt className='text-sm font-medium text-gray-500'>ขนาด :</dt>
              <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>{data.dosage} (มล.)</dd>
            </div>
            <div className='bg-white px-2 py-3 sm:grid sm:grid-cols-3 sm:gap-2 sm:px-4'>
              <dt className='text-sm font-medium text-gray-500'>สูตร :</dt>
              <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>{data.formulaNameTh} {data.formulaNameEn && <>[ {data.formulaNameEn} ]</>}</dd>
            </div>
            <div className='bg-gray-50 px-2 py-3 sm:grid sm:grid-cols-3 sm:gap-2 sm:px-4'>
              <dt className='text-sm font-medium text-gray-500'>บรรจุภัณฑ์ :</dt>
              <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                {data.packageNameTh && <>{data.packageNameTh} {data.packageNameEn && <>[ {data.packageNameEn} ]</>}</> || 'กำหนดเอง'}
              </dd>
            </div>
            {data.packageNameTh && (
              <div className='bg-white px-2 py-3 sm:grid sm:grid-cols-3 sm:gap-2 sm:px-4'>
                <dt className='text-sm font-medium text-gray-500'>ปริมาณบรรจุต่ำสุด :</dt>
                <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>{data.packageMinDosage} (มล.)</dd>
                <dt className='text-sm font-medium text-gray-500'>ปริมาณบรรจุสูงสุด :</dt>
                <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>{data.packageMaxDosage} (มล.)</dd>
              </div>
            )}
            <div className='bg-gray-50 px-2 py-3 sm:grid sm:grid-cols-3 sm:gap-2 sm:px-4'>
              <dt className='text-sm font-medium text-gray-500'>ราคา :</dt>
              <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>{data.packagePrice} บาท/ชิ้น</dd>
            </div>
            <div className='bg-white px-2 py-3 sm:grid sm:grid-cols-3 sm:gap-2 sm:px-4'>
              <dt className='text-sm font-medium text-gray-500'>หมวดหมู่หลัก :</dt>
              <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>{data.productCategoryNameTh} {data.productCategoryNameEn && <>[ {data.productCategoryNameEn} ]</>}</dd>
            </div>
            <div className='bg-gray-50 px-2 py-3 sm:grid sm:grid-cols-3 sm:gap-2 sm:px-4'>
              <dt className='text-sm font-medium text-gray-500'>หมวดหมู่ย่อย :</dt>
              <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>{data.productSubCategoryNameTh} {data.productSubCategoryNameEn && <>[ {data.productSubCategoryNameEn} ]</>} </dd>
            </div>
            <div className='bg-white px-2 py-3 sm:grid sm:grid-cols-3 sm:gap-2 sm:px-4'>
              <dt className='text-sm font-medium text-gray-500'>ผลิตภัณฑ์ :</dt>
              <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>{data.productNameTh} {data.productNameEn && <>[ {data.productNameEn} ]</>}</dd>
            </div>
            <div className='bg-gray-50 px-2 py-3 sm:grid sm:grid-cols-3 sm:gap-2 sm:px-4'>
              <dt className='text-sm font-medium text-gray-500'>รหัสสินค้า :</dt>
              <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>{data.productItemCode}</dd>
            </div>
            <div className='bg-white px-2 py-3 sm:grid sm:grid-cols-3 sm:gap-2 sm:px-4'>
              <dt className='text-sm font-medium text-gray-500'>จำนวน :</dt>
              <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>{numberFormat(data.productAmount)} ชิ้น</dd>
            </div>
            <div className='bg-gray-50 px-2 py-3 sm:grid sm:grid-cols-3 sm:gap-2 sm:px-4'>
              <dt className='text-sm font-medium text-gray-500'>ปริมาณขั้นต่ำ :</dt>
              <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>{data.productMinKgDosage} (กิโลกรัม)</dd>
            </div>
            <div className='bg-white px-2 py-3 sm:grid sm:grid-cols-3 sm:gap-2 sm:px-4'>
              <dt className='text-sm font-medium text-gray-500'>รวมทั้งหมด :</dt>
              <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 font-bold'>{numberFormat(sum)} บาท</dd>
            </div>
            <div className='bg-gray-50 py-3 sm:grid sm:grid-cols-3 sm:gap-2 sm:px-4'>
              <dt className='text-sm font-medium text-gray-500'>ต้นทุนคงที่รวม :</dt>
              <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 font-bold'>{numberFormat(totalFixedCost)} บาท</dd>
            </div>
            <div className='bg-white px-2 py-3 sm:grid sm:grid-cols-3 sm:gap-2 sm:px-4'>
              <dt className='text-sm font-medium text-gray-500'>ต้นทุนผันแปรรวม :</dt>
              <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 font-bold'>{numberFormat(totalVariableCost)} บาท</dd>
            </div>
            <div className='bg-gray-50 px-2 py-3 sm:grid sm:grid-cols-3 sm:gap-2 sm:px-4'>
              <dt className='text-sm font-medium text-gray-500'>ต้นทุนสินค้าต่อชิ้น :</dt>
              <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 font-bold'>{numberFormat(costPerPiece)} บาท</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  )
})





