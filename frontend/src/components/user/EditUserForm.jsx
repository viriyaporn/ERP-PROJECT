import { useState } from "react";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import UserPositionEnum from "../../enums/UserPositionEnum";
import UserTypeEnum from "../../enums/UserTypeEnum";
import { readImg } from "../../utils/Utils";
import Input from "../inputs/Input";
import SelectBox from "../inputs/SelectBox";

export default function EditUserForm({
  onSubmit,
  defaultData,
}) {
  const [formDisabled, setFormDisable] = useState(false);
  const {
    control,
    setValue,
    getValues,
    handleSubmit,
    watch,
    reset: resetForm,
    formState: { errors }
  } = useForm({
    defaultValues: {
      id: '',
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      phoneNo: '',
      avatar: '',
      userType: '',
      position: '',
      isActive: true,
      password: '',
      passwordConfirmation: '',
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

  const watchUserType = watch('userType');

  const onAvatarChange = async e => {
    const [file = null] = e.target.files;
    return setValue('avatar', !file ? '' : await readImg(file));
  }

  const handleOnSubmit = data => {
    setValue('password', '')
    setValue('passwordConfirmation', '');
    onSubmit(data)
  }

  return (
    <form onSubmit={handleSubmit(handleOnSubmit)}>
      <fieldset disabled={formDisabled}>
        <div className="mb-4 flex flex-col">
          <label htmlFor="edit-username" className="mb-2 font-semibold">ชื่อบัญชีผู้ใช้งาน <small className="text-red-600">*</small></label>
          <Controller
            name="username"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <Input type="text" onChange={onChange} value={value} placeholder="ระบุชื่อบัญชีผู้ใช้งาน" required />
            )}
          />
          {errors.username && <p className="text-red-600 my-3">username ไม่ถูกต้อง</p>}
        </div>
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div className="flex flex-col">
            <label htmlFor="edit-password" className="mb-2 font-semibold">รหัสผ่าน</label>
            <Controller
              name="password"
              control={control}
              rules={{
                minLength: 4
              }}
              render={({ field: { onChange, value } }) => (
                <Input type="password" onChange={onChange} value={value} placeholder="ระบุรหัสผ่านหากต้องการเปลี่ยน" />
              )}
            />
            <p className="text-sm text-gray-300 mt-3">ระบุหากต้องการเปลี่ยนรหัสผ่าน</p>
            {errors.password && <p className="text-red-600 my-3">รหัสผ่านไม่ถูกต้อง</p>}
          </div>
          <div className="flex flex-col">
            <label htmlFor="edit-password-confirmation" className="mb-2 font-semibold">ยืนยันรหัสผ่าน</label>
            <Controller
              name="passwordConfirmation"
              control={control}
              rules={{
                validate: value => value === getValues().password
              }}
              render={({ field: { onChange, value } }) => (
                <Input type="password" onChange={onChange} value={value} placeholder="ระบุรหัสผ่านอีกครั้ง" />
              )}
            />
            {errors.passwordConfirmation && <p className="text-red-600 my-3">รหัสผ่านไม่ตรงกัน</p>}
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div className="flex flex-col">
            <label htmlFor="edit-firstName" className="mb-2 font-semibold">ชื่อ <small className="text-red-600">*</small></label>
            <Controller
              name="firstName"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <Input type="text" onChange={onChange} value={value} placeholder="ระบุชื่อ" required />
              )}
            />
            {errors.firstName && <p className="text-red-600 my-3">firstName ไม่ถูกต้อง</p>}
          </div>
          <div className="flex flex-col">
            <label htmlFor="edit-lastName" className="mb-2 font-semibold">นามสกุล</label>
            <Controller
              name="lastName"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input type="text" onChange={onChange} value={value} placeholder="ระบุนามสกุล" />
              )}
            />
            {errors.lastName && <p className="text-red-600 my-3">lastName ไม่ถูกต้อง</p>}
          </div>
        </div>
        <div className="mb-4 flex flex-col">
          <label htmlFor="edit-email" className="mb-2 font-semibold">อีเมล <small className="text-red-600">*</small></label>
          <Controller
            name="email"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <Input type="email" onChange={onChange} value={value} placeholder="ระบุอีเมล" required />
            )}
          />
          {errors.email && <p className="text-red-600 my-3">email ไม่ถูกต้อง</p>}
        </div>
        <div className="mb-4 flex flex-col">
          <label htmlFor="edit-phoneNo" className="mb-2 font-semibold">เบอร์โทรศัพท์</label>
          <Controller
            name="phoneNo"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input type="tel" onChange={onChange} value={value} placeholder="ระบุเบอร์โทรศัพท์" />
            )}
          />
          {errors.phoneNo && <p className="text-red-600 my-3">phoneNo ไม่ถูกต้อง</p>}
        </div>
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div className="flex flex-col">
            <label htmlFor="edit-userType" className="mb-2 font-semibold">ระดับบัญชี <small className="text-red-600">*</small></label>
            <Controller
              name="userType"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <SelectBox onChange={onChange} required value={value}>
                  {Object.values(UserTypeEnum).map(item => (
                    <option key={item.code} value={item.code}>{item.textTh}</option>
                  ))}
                </SelectBox>
              )}
            />
            {errors.userType && <p className="text-red-600 my-3">userType ไม่ถูกต้อง</p>}
          </div>
          <div className="flex flex-col">
            <label htmlFor="edit-position" className="mb-2 font-semibold">ตำแหน่ง {watchUserType !== UserTypeEnum.user.code && <small className="text-red-600">*</small>}</label>
            <Controller
              name="position"
              control={control}
              rules={{ required: watchUserType !== UserTypeEnum.user.code }}
              render={({ field: { onChange, value } }) => (
                <SelectBox onChange={onChange} required value={value}>
                  {watchUserType === UserTypeEnum.user.code ? (
                    <option value>ไม่ระบุ</option>
                  ) : (
                    <option value>- โปรดระบุ -</option>
                  )}
                  {Object.values(UserPositionEnum).filter(x => x.userType.code == watchUserType).map(item => (
                    <option key={item.code} value={item.code}>{item.nameTh}</option>
                  ))}
                </SelectBox>
              )}
            />
            {errors.userType && <p className="text-red-600 my-3">userType ไม่ถูกต้อง</p>}
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
          {errors.isActive && <span className="text-red-500 mb-3">สถานะ ไม่ถูกต้อง</span>}
        </div>
        <div className=" flex flex-col">
          <label htmlFor="text" className="">รูปภาพ</label>
          <Input type="file" accept="image/*" onChange={onAvatarChange} />
          {errors.avatar && <p className="text-red-600 my-3">avatar ไม่ถูกต้อง</p>}
        </div>

        <div className="mt-10 text-center">
          <button type="submit" className="w-full px-4 py-2 font-bold text-white bg-blue-600 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline">
            <i className="far fa-save mr-2"></i>
            <span>บันทึกข้อมูล</span>
          </button>
        </div>
      </fieldset>
    </form>
  )
}