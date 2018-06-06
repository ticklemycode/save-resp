#! /usr/bin/env node
'use strict'

const axios = require('axios');
const fs = require('fs');
const path = require('path');
const options = require('./options');
const colors = require('./colors');

const intervalOption = options.interval || null;
const timeoutOption = options.timeout || null;
const prefix = options.prefix || 'response';
const outputDir = options.out || '';
let masterInterval = null;
let masterTimeout = null;


// print help/usage
if(options.help){
  return false;
}

console.log(`${colors.FgCyan}`, `USER OPTIONS: ${JSON.stringify(options, null, 2)}`);

// Fire request at least once
getResponse();

// Interval
if(!!intervalOption){
  console.log(`${colors.FgMagenta}`, `Polling every: ${intervalOption} ms` );

  masterInterval = setInterval(() => {
    getResponse();
  }, intervalOption);
}


// timeout
if(!!timeoutOption && intervalOption){
  console.log(`${colors.FgMagenta}`, `Timer set to: ${timeoutOption} ms`);

  masterTimeout = setTimeout(() => {
    clearInterval(masterInterval);
    console.log(colors.FgCyan, `[${new Date}] - timeout complete.`)
  }, timeoutOption);
}


/**
 * Make ajax request with provided URL
 */
function getResponse() {
  axios.get(options.url)
  .then((response) => {
    let contentType = response.headers['content-type'];
    let fileType;
    let data;

    switch(contentType.slice(0, contentType.indexOf(';'))) {
      case 'application/xml' :
        fileType = 'xml';
        data = response.data;
        break;
      case 'application/json' :
        fileType = 'json';
        data = JSON.stringify(response.data, null, 2);
        break;
      default: {
        fileType = 'txt';
        data = response.data;
      }
    }

    console.log(colors.FgYellow, `[response status] - ${response.status}`);
    writeData(data, fileType);

  })
  .catch(function (error) {
    console.log(colors.FgRed, `[${new Date}] - ${error}`);
  });
};


/**
 * Util to insure specified file dir exist.
 *
 * @param {*} filePath
 * @returns
 */
function ensureDirectoryExistence (filePath) {
  const dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  ensureDirectoryExistence(dirname);
  fs.mkdirSync(dirname);
}


/**
 * Create file to output dir.
 *
 * @param {*} data
 */
function writeData(data, fileType) {
  const dateFormat = (options.timestamp)? new Date().getTime() : new Date();
  const filename = `${outputDir}${prefix}_${dateFormat.toString().replace(/\s/g, '_')}.${fileType}`;

  ensureDirectoryExistence(filename);

  fs.writeFile(filename, data, 'utf8', function (err, data){
    if (err){
      return console.log(colors.FgRed, `[${new Date}] - ${err}`);
    }

    console.log(colors.FgGreen, `[${new Date}] - file created: ${filename}`);
  });
};

// clear any timeouts or intervals set on exit
process.on('SIGINT', function () {
  clearInterval(masterInterval);
  clearTimeout(masterTimeout);
});