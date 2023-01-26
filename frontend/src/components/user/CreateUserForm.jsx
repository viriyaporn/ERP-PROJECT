import { Controller, useForm } from "react-hook-form";
import UserPositionEnum from "../../enums/UserPositionEnum";
import UserTypeEnum from "../../enums/UserTypeEnum";
import useLazyApiService from "../../hooks/useLazyApiService";
import { checkDuplicateFieldValue } from "../../services/AuthService";
import { readImg } from "../../utils/Utils";
import Button from "../Button";
import Input from "../inputs/Input";
import SelectBox from "../inputs/SelectBox";

export default function CreateUserForm({
  onSubmit,
}) {
  const [checkDuplicate, checkDuplicateResult] = useLazyApiService(checkDuplicateFieldValue);

  const {
    control,
    setValue,
    handleSubmit,
    watch,
    setError,
    clearErrors,
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
      password: ''
    },
  });

  const watchUserType = watch('userType');

  const onAvatarChange = async e => {
    const [file = null] = e.target.files;
    return setValue('avatar', !file ? '' : await readImg(file));
  }

  let timeout;

  const onUniqueFieldInput = e => {
    clearTimeout(timeout);

    const { name: field, value } = e.target;
    if (!value) return clearErrors(field);

    timeout = setTimeout(async () => {
      try {
        await checkDuplicate(field, value);
        return clearErrors(field);
      } catch (e) {
        if (e?.code === 422) {
          setError(field, {
            type: 'custom',
            message: e?.message ?? 'พบปัญหาในการตรวจสอบ'
          })
        }
        if (e?.code == 200) {
          setError(field, {
            type: 'custom',
            message: 'สามารถใช้งานได้'
          })
        }
      }
    }, 1000);
  }

  return (
    <form onSubmit={handleSubmit(info => onSubmit(info, resetForm))}>
      <div className="grid sm:grid-cols-2 gap-3 mb-3">
        <div className="flex flex-col">
          <label className="mb-2">ชื่อจริง</label>
          <Controller
            name="firstName"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <Input type="text" onChange={onChange} value={value} placeholder="ระบุชื่อจริง" />
            )}
          />
          {errors.firstName && <p className="text-red-500 my-3">ชื่อจริง ไม่ถูกต้อง</p>}
        </div>
        <div className="flex flex-col">
          <label className="mb-2">นามสกุล </label>
          <Controller
            name="lastName"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input type="text" onChange={onChange} value={value} placeholder="ระบุนามสกุล" />
            )}
          />
          {errors.lastName && <p className="text-red-500 my-3">นามสกุล ไม่ถูกต้อง</p>}
        </div>
      </div>

      <div className="flex flex-col mb-3">
        <label className="mb-2">Username</label>
        <Controller
          name="username"
          control={control}
          rules={{
            required: true,
            onChange: e => onUniqueFieldInput(e),
          }}
          render={({ field: {onChange, value, name} }) => (
            <Input type="text" name={name} value={value} onChange={onChange} placeholder="ระบุ Username" className={`${errors.username && 'border-red-500'}`} />
          )}
        />
        {errors.username && <div className="text-red-500 my-3">{errors.username.message || 'ชื่อ Username ไม่ถูกต้อง'}</div>}
      </div>
      <div className="flex flex-col mb-3">
        <label className="mb-2">รหัสผ่าน</label>
        <Controller
          name="password"
          control={control}
          rules={{ required: true, minLength: 8 }}
          render={({ field: {onChange, value, name} }) => (
            <Input type="password" name={name} value={value} onChange={onChange} minLength="8" placeholder="ระบุรหัสผ่าน" />
          )}
        />
        {errors.password && <p className="text-red-600 my-3"> รหัสผ่านไม่ถูกต้อง</p>}
      </div>
      <div className="flex flex-col mb-3">
        <label className="mb-2">Email</label>
        <Controller
          name="email"
          control={control}
          rules={{
            required: true,
            pattern: /^.+@.+\..+$/g,
            onChange: e => onUniqueFieldInput(e),
          }}
          render={({ field: {onChange, value, name} }) => (
            <Input type="email" name={name} value={value} onChange={onChange} placeholder="ระบุ Email" className={`${errors.email && 'border-red-600'}`} />
          )}
        />
        {errors.email && <div className="text-red-500 my-3">{errors.email.message || 'อีเมลไม่ถูกต้อง'}</div>}
      </div>

      <div className="flex flex-col mb-3">
        <label className="mb-2">เบอร์โทรศัพท์</label>
        <Controller
          name="phoneNo"
          control={control}
          rules={{
            pattern: /^0\d{9}$/g,
            onChange: e => onUniqueFieldInput(e),
          }}
          render={({ field: {onChange, value, name} }) => (
            <Input type="tel" name={name} value={value} onChange={onChange} placeholder="ระบุเบอร์โทรศัพท์" className={`${errors.phoneNo && 'border-red-600'}`} />
          )}
        />
        {errors.phoneNo && <div className="text-red-500 my-3">{errors.phoneNo.message || 'เบอร์โทรศัพท์ไม่ถูกต้อง'}</div>}
      </div>
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div className="flex flex-col">
          <label className="mb-2 font-semibold">ระดับบัญชี <small className="text-red-500">*</small></label>
          <Controller
            name="userType"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <SelectBox onChange={onChange} required value={value}>
                <option value=''>- โปรดระบุ -</option>
                {Object.values(UserTypeEnum).map(item => (
                  <option key={item.code} value={item.code}>{item.textTh}</option>
                ))}
              </SelectBox>
            )}
          />
          {errors.userType && <p className="text-red-500 my-3">userType ไม่ถูกต้อง</p>}
        </div>
        <div className="flex flex-col">
          <label className="mb-2 font-semibold">ตำแหน่ง {watchUserType !== UserTypeEnum.user.code && <small className="text-red-500">*</small>}</label>
          <Controller
            name="position"
            control={control}
            rules={{ required: watchUserType != UserTypeEnum.user.code }}
            render={({ field: { onChange, value } }) => (
              <SelectBox onChange={onChange} value={value}>
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
          {errors.position && <p className="text-red-500 my-3">position ไม่ถูกต้อง</p>}
        </div>
      </div>

      <div className="flex flex-col mb-3">
        <label className="mb-2 font-semibold">สถานะ <small className="text-red-500">*</small></label>
        <Controller
          name="isActive"
          control={control}
          rules={{ required: watchUserType != UserTypeEnum.user.code }}
          render={({ field: { onChange, value } }) => (
            <SelectBox onChange={onChange} value={value}>
              <option value={true}>เปิดใช้งาน</option>
              <option value={false}>ปิดใช้งาน</option>
            </SelectBox>
          )}
        />
        {errors.isActive && <p className="text-red-500 my-3">isActive ไม่ถูกต้อง</p>}
      </div>

      <div className="flex flex-col mb-3">
        <label className="mb-2">รูปภาพ</label>
        <Input id="create-avatar" type="file" onChange={onAvatarChange} accept="image/*" />
      </div>

      <div className="mt-6 text-center">
        <button type="submit" className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline">
          <i className="far fa-save"></i>  บันทึกข้อมูล
        </button>

      </div>
    </form>
  )
}