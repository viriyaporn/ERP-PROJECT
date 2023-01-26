const { User } = require("../models/Models");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserTypeEnum = require('../enums/UserTypeEnum');
const { Op } = require('sequelize');
const { default: StatusCode } = require("status-code-enum");

const userLogin = async ({
  username = null,
  email = null,
  password = null,
  from
}, usePassword = true) => {

  const unauthorizedResponse = {
    code: StatusCode.ClientErrorUnauthorized,
    message: 'ข้อมูลบัญชีไม่ถูกต้อง',
  };

  const notFoundResponse = {
    code: StatusCode.ClientErrorNotFound,
    message: 'ไม่พบข้อมูลบัญชี',
  };

  const permissions = {
    frontend: UserTypeEnum.user.code,
    backoffice: UserTypeEnum.admin.code,
  }

  try {
    const user = await User.findOne({ where: { [Op.or]: {username, email} }, raw: true });
    const { password: userPassword, ...userData } = user;

    if (!user) throw notFoundResponse;
    if (usePassword && !await bcrypt.compare(password, userPassword)) throw unauthorizedResponse;
    if (permissions[from] !== user.userType) throw unauthorizedResponse;

    const accessToken = jwt.sign({ userId: user.id }, process.env.APP_TOKEN, { expiresIn: '1h' });
    const refreshToken = jwt.sign({ userId: user.id }, process.env.APP_TOKEN);

    return {
      accessToken,
      refreshToken,
      user: userData,
    }
  } catch (e) {
    console.error('userLogin ERROR:', e);
    throw e;
  }
}

const userRegister = async ({
  firstName,
  lastName,
  username,
  password,
  email,
  phoneNo,
}) => {
  await checkUserDuplicate({ username, email, phoneNo });

  const salt = await bcrypt.genSalt(10);
  const bcryptPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    firstName,
    lastName,
    username,
    password: bcryptPassword,
    email,
    phoneNo,
    userType: UserTypeEnum.user.code,
  });

  return user;
}

const checkUserDuplicate = async ({ username = null, email = null, phoneNo = null }) => {
  const where = [];

  if (username) where.push({ username });
  if (email) where.push({ email });
  if (phoneNo) where.push({ phoneNo });

  const users = await User.findAll({
    where: { [Op.or]: where }
  });

  let message;

  if (users.find(user => String(user.phoneNo) === String(phoneNo))) {
    message = 'มีผู้ใช้งานเบอร์โทรศัพท์นี้แล้ว';
  }

  if (users.find(user => user.username === String(username))) {
    message = 'มีผู้ใช้งาน Username นี้แล้ว';
  }

  if (users.find(user => user.email === email)) {
    message = 'มีผู้ใช้งานอีเมลนี้แล้ว';
  }

  console.log(JSON.stringify(users, '', 1));

  if (users.length) {
    throw { code: 422, message };
  }
}

const updateUser = async (userId, data) => {
  const fields = [
    "firstName",
    "lastName",
    "email",
    "phoneNo",
    "avatar",
    "userType",
    "position",
    "isActive",
  ];

  if (data.password) {
    const salt = await bcrypt.genSalt(10);
    data.password = await bcrypt.hash(data.password, salt);
    fields.push('password');
  }

  return User.update(data, {
    where: { id: userId },
    fields,
  });
}
module.exports = {
  userLogin,
  userRegister,
  checkUserDuplicate,
  updateUser,
  // checkRegisterDuplicate,
}