const url = require('url');
const { writeFileSync } = require('fs');

const getAuthCode = require('./auth-code.js');
const getAccessToken = require('./access-token.js');
const redirectUrl = { protocol: 'http', hostname: 'localhost', port: 8080 };


module.exports = (file, baseUrl, callback) => {
  const credentials = require(file);
  const saveCredentials = (credentials) =>
    writeFileSync(file, JSON.stringify(credentials, null, 2));

  getAuthCode(baseUrl, redirectUrl, credentials, (authError, authCode)=> {
    if(authError) {
      return callback(authError);
    }
    Object.assign(credentials, {authCode});
    saveCredentials(credentials);

    getAccessToken(baseUrl, redirectUrl, credentials, (tokenError, tokenData) => {
      if(tokenError) {
        return callback(tokenError);
      }
      Object.assign(credentials, tokenData);
      saveCredentials(credentials);
      callback(null, credentials);
    });
  });
};
