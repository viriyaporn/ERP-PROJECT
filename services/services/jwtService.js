const jwt = require('jsonwebtoken');

/**
 * @param {string} accessToken 
 * @param {string} refreshToken 
 */
const jwtVerify = async (accessToken, refreshToken) => {
  let jwtData;
  const appToken = process.env.APP_TOKEN
  try {
    jwtData = jwt.verify(accessToken, appToken);
  } catch (e) {
    if (e.name === 'TokenExpiredError') {
      jwt.verify(refreshToken, appToken);
      const { user_id, username } = jwt.decode(accessToken, appToken);
      accessToken = await createToken(user_id, username);
      jwtData = jwt.decode(accessToken, { json: true });
    }
    throw e;
  }

  return {
    accessToken,
    refreshToken,
    ...jwtData,
  }
}

module.exports = {
  jwtVerify,
}