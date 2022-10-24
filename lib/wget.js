'use strict';

const puppeteer = require('puppeteer');
const fse = require('fs-extra');
const axios = require('axios');


function parseURL(request_url){
  const url = new URL(request_url)
  const request_host = url.host
  const request_pathname = url.pathname
  const request_dir = url.pathname.substring(0,url.pathname.lastIndexOf('/'))
  const request_file = url.pathname.substring(url.pathname.lastIndexOf('/')+1)
  const index = request_file.lastIndexOf(".")
  const request_file_type = index > 0 ? request_file.substring(request_file.lastIndexOf(".")+1):""
  return {
    request_url,
    request_host,
    request_pathname,
    request_dir,
    request_file,
    request_file_type
  }
}

const wget = async (goto_url) => {
  const browser = await puppeteer.launch({headless: true});
  const page = await browser.newPage();
  const result = [];

  await page.setRequestInterception(true);

  await page.on('request', async request => {
    console.log("Request\t\t-->\t" + request.url())
    result.push(request.url())
    axios.get(request.url()).then( response => request).catch( error => {
      console.error(request.url() + " " + error.response.status);
      //request.abort();
    }).finally(async response => {
        request.continue();
    })
  });
  const goto_url_host = new URL(goto_url).hostname
  await page.on('response', async function (response) {
    const response_data = await response.buffer()
    console.log("Response\t<-\t" + response.url())
    await callback({
      ...parseURL(response.url()),
      response_data,
      goto_url_host
    });
 })

  await page.goto(goto_url, {waitUntil: 'networkidle0',});

  await browser.close();
};


async function callback({
    goto_url_host,
    request_url,
    request_host,
    request_pathname,
    request_dir,
    request_file,
    request_file_type,
    response_data
  }){
    if(request_host===goto_url_host){
        request_pathname = request_pathname==="/"? "index.html" : request_pathname
        fse.outputFileSync("./temp/" + request_pathname, response_data)
        console.log("download\t+\t" + request_url)
    }
}


if (process.argv.length===3 && process.argv[1] === __filename) {
    const goto_url = process.argv[2]
    if(goto_url) wget(goto_url)
}
