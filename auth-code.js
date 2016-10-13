const { createServer } = require('http');
const url = require('url');
const opn = require('opn');

module.exports = (baseUrl, redirectUrl, credentials, callback) => {
  const {clientId, clientSecret, authCode: existingAuthCode} = credentials;
  if (existingAuthCode) return callback(null, existingAuthCode);

  console.error('Reqesting authorisation code...');

  const server = createServer((request, response) => {
    const { query: {code: authCode} } = url.parse(request.url, true);
    response.end('Back to your terminal...');
    callback(null, authCode);
    server.close();
  });
  server.listen(redirectUrl.port, redirectUrl.hostname);

  const approveUrl = url.format(Object.assign({}, baseUrl, {
    pathname: `/v2/approve_app`,
    query: {
      response_type: 'code',
      redirect_uri: url.format(redirectUrl),
      client_id: clientId,
      client_secret: clientSecret,
    }
  }));
  opn(approveUrl);
};
