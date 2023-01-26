const app = require("../configs/app");
const randToken = require('rand-token');
const { default: StatusCode } = require("status-code-enum");
const { Token, User } = require("../models/Models");
const { decrypt } = require("../utils/Utils");

const ONE_HOUR = 3600; // 60 seconds * 60 minutes

/**
 * Generate 1-hour-expired token for password reset
 * @param {User} user 
 * @param {number} expiredMin
 */
const generateToken = async (userId, expiredMin = ONE_HOUR) => {
  const token = randToken.generate(32);
  await Token.create({
    expiredAt: (new Date).getTime() + expiredMin * 1000,
    token,
    userId,
  });
  return token;
}

const generateResetPasswordLink = (token, from) => {
  const targetLink = app[`${from.toUpperCase()}_URL`];
  return `${targetLink}/reset-password?token=${token}`;
}

/**
 * verifyToken
 * @param {string} encryptedToken 
 */
const verifyToken = async (encryptedToken) => {
  const data = decrypt(encryptedToken.replaceAll(' ', '+'));

  const {
    userId = null,
    token = null,
  } = await new Promise(resolve => resolve(JSON.parse(data))).catch(e => {
    throw {
      code: StatusCode.ClientErrorUnprocessableEntity,
      message: 'Token ไม่ถูกต้อง โปรดทำรายการอีกครั้ง',
    }
  })

  const tokenModel = await Token.findOne({ where: { userId, token, isActive: true } })
  if (!tokenModel) {
    throw {
      code: StatusCode.ClientErrorNotFound,
      message: 'ไม่พบข้อมูล Token นี้อาจถูกใช้งานไปแล้ว โปรดทำรายการใหม่อีกครั้ง',
    };
  }

  if (new Date > tokenModel.expiredAt) {
    throw {
      code: StatusCode.ClientErrorGone,
      message: 'Token หมดอายุแล้ว โปรดทำรายการใหม่อีกครั้ง',
    };
  }

  return tokenModel;
}

module.exports = {
  generateToken,
  generateResetPasswordLink,
  verifyToken,
}