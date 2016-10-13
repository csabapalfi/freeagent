#!/usr/bin/env node

const url = require('url');
const request = require('request');

const {
  env: { HOME: home },
  argv: [,, path],
} = process;

const getCredentials = require('./credentials');

const baseUrl = {
  protocol: 'https',
  hostname: 'api.freeagent.com',
  pathname: '/v2'
};

const credentialsFile = `${home}/.freeagent.json`;

getCredentials(credentialsFile, baseUrl, (error, credentials) => {
  if (error) {
    return console.log(error);
  }
  request({
    baseUrl: url.format(baseUrl),
    url: process.argv[2],
    auth: { bearer: credentials.accessToken },
    headers: {
      'User-Agent': 'Terminal'
    }
  }, (err, res, body) => {
    console.log(body);
    process.exit(0);
  });
})
