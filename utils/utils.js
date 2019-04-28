const sha1 = require('./sha1.js');
const md5 = require('./md5.js');
const config = require('../config.js');
import globalData from './globalData.js'
import { getUserOpenId } from "./common.js";
function kSort(obj) {
  var newkey = Object.keys(obj).sort();
  var newObj = {};
  for (var i = 0; i < newkey.length; i++) {
    newObj[newkey[i]] = obj[newkey[i]];
  }
  return newObj;
};
function sign(data, token, apiKey, open = true) {    
  if (!open) {
    return {
      "Content-Type": "raw"
    };
  };
  var apiSecret = md5(apiKey + token);
  var nonce = Math.random()
  var timestamp = parseInt(new Date().getTime() / 1000);
  var sessionKey = data.sessionKey;
  data = kSort(data);
  data = JSON.stringify(data);
  var signatrue = sha1(apiSecret + nonce + timestamp + data)
  var header = {
    "Content-Type": "raw",
    'API-SESSIONKEY': sessionKey,
    'API-SIGNATURE': signatrue,
    'API-TIMESTAMP': timestamp,
    'API-NONCE': nonce,
    'API-KEY': apiKey,
  };
  return header;
};
module.exports.requst = function(url, method, data) {
  if (url != "weixin/getopenid") {
    var token = globalData.getres.token;
    var apiKey = config.apiKey;
    var header = sign(data, token, apiKey, true);
  }
  return new Promise((resolve, reject) => {
    uni.request({  
      url: config.requestUrl+url,
      data: data,
      header: header,
      method: method.toUpperCase(),
      success: function(res) {
        if (res.data.code == 200) {
          resolve(res.data);
        } else if (res.data.code == 2002) {
          globalData.sessionKey = "";
          getUserOpenId();
        } else if (res.data.code == 0) {
          globalData.sessionKey = "";
          globalData.getres = null;
          getUserOpenId();
        } else if (res.data.code == 2001 || res.data.code == 2000) {
          uni.redirectTo({
            url: '/pages/error/error',
          })
        } else {
          reject(res.data.msg);
        }
      },
      fail: function(res) {
        reject(res)
      }
    })
  })
}