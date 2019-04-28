	import globalData from './globalData.js'
  import utils from './utils.js'
  import util from './util.js'
  const config = require('../config.js');
  export function getUserOpenId(fid, qid) {
    return new Promise((resove, reject) => {
      if (globalData.sessionKey) {
        resove(globalData.sessionKey)
      } else {
        console.log(config.requestUrl)
        uni.login({
          success: function(res) {
            var param = {
              js_code: res.code,
              phone_type: util.getWindowSize().model,
              activity_id: config.boxId
            }
            if (fid) {
              param.fid = fid
            }
            if (qid) {
              param.qid = qid
            }
            utils.requst("weixin/getopenid", "POST", param).then((res) => {
              var time = parseInt(res.data.lasttime - 5000);
              console.log("time", time)
              setTimeout(function () {
                globalData.sessionKey =null
              }, time)
              if (res.data.status != 1) {
                uni.redirectTo({
                  url: '../frozen/frozen',
                })
                return;
              }
              globalData.sessionKey = res.data.sessionKey;
              globalData.getres = res.data;
              resove(res.data.sessionKey);
            }).catch((res) => {
              reject(res)
            })
          },
          fail: function(err) {
            reject(err)
          }
        })
      }
    })
  };
  export function formid(key, e){
    var param = {
      sessionKey: key,
      form_id: e.detail.formId ? e.detail.formId : ''
    }
    utils.requst("weixin/getformid", "POST", param)
  };
  export function bindGetUserInfo(e) {
    return new Promise((resolve, reject) => {
      if (e.detail.errMsg != "getUserInfo:ok") {
        resolve(1)
        return
      }
      uni.getSetting({
        success: function(res) {
          if (res.authSetting['scope.userInfo']) {
            console.log("chengg")
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称
            uni.getUserInfo({
              success: function(res) {
                console.log("qqqqqqqqqqqqqqqqq",res)
                globalData.userInfo = res.userInfo;
                getUserOpenId().then((key) => {
                  globalData.getres.authorize_status = 2;
                  var param = {
                    sessionKey: key,
                    iv: res.iv,
                    encryptedData: res.encryptedData
                  }
                  utils.requst("weixin/getuserinfo", "POST", param).then((res) => {
                      resolve(res)
                  })
                })
              },
            })
          }
        }
      })
    })
  };