import React, { useEffect } from 'react'

export default React.memo(function TrackStatusDetail({
  data,
}) {
  return data && (
    <div>
      <div className="md:flex">
        <div className="lg:basis-1/2 md:mr-5">
          <img src={data.image} className="md:w-64 mx-auto lg:w-full mb-5 rounded-lg max-w-full h-auto" />
        </div>

        <dl className='lg:basis-1/2 0text-sm md:text-md lg:text-base overflow-auto max-h-[75vh] flex-grow rounded-lg border dark:border-gray-500 px-4 py-3'>
          {Object.entries(data).map(([key, value], index) => typeof value === 'object' || key.endsWith('Id') || key === 'image' ? <></> : <>
            <dt key={'dt_' + key} className='text-sky-300 font-bold'>{key.replace(/([a-z])([A-Z])/g, '$1 $2')}:</dt>
            <dd className='whitespace-normal ml-3 mb-2'>
              {typeof value !== 'object' ? (typeof value === 'boolean' ? (value ? 'True' : 'False') : value) : ''}
            </dd>
          </>)}
          <dt className='font-bold text-sky-300'>หมวดหมู่หลัก</dt>
          <dd className='whitespace-normal ml-3 mb-2'>
            {data.ProductCategory.nameTh}
          </dd>

          <dt className='font-bold text-sky-300'>หมวดหมู่ย่อย</dt>
          <dd className='whitespace-normal ml-3 mb-2'>
            {data.ProductSubCategory.nameTh}
          </dd>

          <dt className='font-bold text-sky-300'>เนื้อผลิตภัณฑ์</dt>
          <dd className='whitespace-normal ml-3 mb-2'>
            {!data.Texture ? 'ไม่ระบุ' : data.Texture.nameTh}
          </dd>

          <dt className='font-bold text-sky-300'>ประสิทธิภาพ</dt>
          <dd className='whitespace-normal ml-3 mb-2'>
            <ol className='list-decimal list-inside'>
              {!data.Efficacies.length ? 'ไม่ระบุ' : data.Efficacies.map(efficacy => (
                <li key={`efficacy_${efficacy.id}`}>{efficacy.nameTh}</li>
              ))}
            </ol>
          </dd>

          <dt className='font-bold text-sky-300'>ประเภทผิว</dt>
          <dd className='whitespace-normal ml-3 mb-2'>
            <ol className='list-decimal list-inside'>
              {!data.SkinTypes.length ? 'ไม่ระบุ' : data.SkinTypes.map(skinType => (
                <li key={`skinType_${skinType.id}`}>{skinType.nameTh}</li>
              ))}
            </ol>
          </dd>

          <dt className='font-bold text-sky-300'>ประเภทบรรจุภัณฑ์</dt>
          <dd className='whitespace-normal ml-3 mb-2'>
            <ol className='list-decimal list-inside'>
              {!data.Packages.length ? 'ไม่ระบุ' : data.Packages.map(packaging => (
                <li key={`packageing${packaging.id}`}>{packaging.nameTh} <span className='text-xs font-extralight text-gray-300'>({packaging.minDosage} - {packaging.maxDosage} ml)</span></li>
              ))}
            </ol>
          </dd>
        </dl>

      </div>
    </div>
  )
})