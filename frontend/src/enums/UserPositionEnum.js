import UserTypeEnum from "./UserTypeEnum"

export default {
  supervisor: {
    userType: UserTypeEnum.admin,
    code: 'supervisor',
    nameTh: 'ผู้ดูแลระบบ',
    nameEn: 'Administrator',
  },
  editor: {
    userType: UserTypeEnum.admin,
    code: 'editor',
    nameTh: 'ผู้จัดการ',
    nameEn: 'Editor',
  },
  editor: {
    userType: UserTypeEnum.admin,
    code: 'editor',
    nameTh: 'ผู้ตรวจสอบ',
    nameEn: 'Viewer',
  },
  general: {
    userType: UserTypeEnum.vendor,
    code: 'general',
    nameTh: 'ทั่วไป',
    nameEn: 'General Information',
  },
  product: {
    userType: UserTypeEnum.vendor,
    code: 'product',
    nameTh: 'สินค้า',
    nameEn: 'Product Data',
  },
}