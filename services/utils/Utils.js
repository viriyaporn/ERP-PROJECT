const { validationResult } = require("express-validator");
const Crypto = require('crypto-js');
const { default: StatusCode } = require("status-code-enum");

/**
 * @param {import('express').Request} req 
 */
const validateRequest = (req) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw {
      code: StatusCode.ClientErrorUnprocessableEntity,
      message: 'ข้อมูลที่คุณระบุไม่ถูกต้อง',
      ...errors
    };
  }

  return true;
}

const encrypt = (data, encKey = process.env.ENCRYPT_KEY) => {
  return Crypto.AES.encrypt(data, encKey);
}

const decrypt = (encryptData, encKey = process.env.ENCRYPT_KEY) => {
  return Crypto.AES.decrypt(encryptData, encKey).toString(Crypto.enc.Utf8);
}

module.exports = {
  validateRequest,
  encrypt,
  decrypt,
}