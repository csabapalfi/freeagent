const url = require('url');
const request = require('request');

module.exports = (baseUrl, redirectUrl, credentials, callback) => {
  const { accessToken: existingAccessToken, expiry} = credentials;
  if (existingAccessToken && Date.now() < expiry) {
    return callback(null, { accessToken: existingAccessToken });
  }

  const { refreshToken: existingRefreshToken } = credentials;
  console.error(
    `${existingRefreshToken ? 'Refreshing' : 'Requesting'} access token...`
  );
  const { clientId, clientSecret, authCode } = credentials;
  const redirect_uri = url.format(redirectUrl);
  request({
    baseUrl: url.format(baseUrl),
    method: 'POST',
    url: '/token_endpoint',
    headers: { 'Accept': 'application/json' },
    auth: { user: clientId, pass: clientSecret },
    form: existingRefreshToken ?
      { grant_type: 'refresh_token', refresh_token: existingRefreshToken } :
      { grant_type: 'authorization_code', code: authCode, redirect_uri }
  }, (err, res, body) => {
    if(err) {
      return callback(err);
    }
    if(res.statusCode >= 400) {
      return callback(body);
    }
    const {
      access_token: accessToken,
      expires_in: expiresIn,
      refresh_token: refreshToken = existingRefreshToken
    } = JSON.parse(body);
    callback(null, {
      accessToken,
      refreshToken,
      expiry: Date.now() + expiresIn * 1000,
    });
  });
}
