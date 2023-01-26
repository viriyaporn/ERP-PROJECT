import { Controller, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import Input from './inputs/Input';

export default function ResetPasswordForm({
  onSubmit,
}) {
  const {
    control,
    setValue,
    getValues,
    handleSubmit,
    reset: resetForm,
    formState: { errors }
  } = useForm({
    defaultValues: {
      password: '',
      passwordConfirmation: '',
    },
  });

  const onSubmitWrap = data => {
    setValue('password', '')
    setValue('passwordConfirmation', '');
    onSubmit(data, resetForm)
  }

  return (
    <form onSubmit={handleSubmit(onSubmitWrap)}>
      <div>
        <div className="mb-4 flex flex-col">
          <label htmlFor="edit-password" className="mb-2 font-semibold dark:text-gray-100">รหัสผ่าน</label>
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
          {errors.password && <p className="text-red-600 my-3">รหัสผ่านไม่ถูกต้อง</p>}
        </div>

        <div className="mb-4 flex flex-col">
          <label htmlFor="edit-password-confirmation" className="mb-2 font-semibold dark:text-gray-100">ยืนยันรหัสผ่าน</label>
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
          {errors.passwordConfirmation && <p className="text-red-600 mt-3">รหัสผ่านไม่ตรงกัน</p>}
        </div>

      </div>
      <div className="mt-10 text-center">
        <button type="submit" className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline">
          <i className="far fa-save"></i> เปลี่ยนรหัสผ่าน
        </button>
        <Link to="/login" className='mt-6 inline-block dark:text-gray-400 hover:text-gray-200'>เข้าสู่ระบบ</Link>
      </div>
    </form>
  )
}
