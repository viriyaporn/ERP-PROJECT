const axios = require('axios').default;
const FormData = require('form-data');
const fs = require('fs');

/**
 * 
 * @returns {Promise<{
 *  ETag: string,
 *  Location: string,
 *  key: string,
 *  Key: string,
 *  Bucket: string}>}
 */
const fileUploader = async file => {
  const uploadUrl = process.env.UPLOAD_URL;
  const token = process.env.UPLOAD_ACCESS_TOKEN;

  const formData = new FormData();
  formData.append('file', fs.createReadStream(file.path));

  const fetched = await axios.post(uploadUrl, formData, {
    headers: {
      Authorization: token,
      ...formData.getHeaders(),
    },
  });

  if (fetched.status !== 200) {
    throw fetched.headers['content-type'].includes('application/json') ? fetched.data : {
      code: fetched.status,
      message: fetched.statusText,
      error: fetched.data,
    };
  }

  const res = fetched.data;
  
  console.log('\n\n', fetched, res);

  if (res.code !== 1) throw res;
  return res.data;
}

module.exports = {
  fileUploader,
}
