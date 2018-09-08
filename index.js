#!/usr/bin/env node

const url = require('url');
const request = require('request');

const {
  env: { HOME: home },
  argv: [,, path, credentialsFile = `${home}/.freeagent.json`],
} = process;

const getCredentials = require('./credentials');

const baseUrl = {
  protocol: 'https',
  hostname: 'api.freeagent.com',
  pathname: '/v2'
};

getCredentials(credentialsFile, baseUrl, (error, credentials) => {
  if (error) {
    return console.log(error);
  }
  request({
    baseUrl: url.format(baseUrl),
    url: path,
    auth: { bearer: credentials.accessToken },
    headers: {
      'User-Agent': 'Terminal'
    }
  }, (err, res, body) => {
    console.log(body);
    process.exit(0);
  });
})
