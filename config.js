
// #ifdef H5
let extConfig = {
		"appid": "wxe9bf29f9cd9f91c3",
		"box_id": 2,
		"siteroot": "https:\/\/test-goddess.molixyou.com\/",
		"xcx_audit_status":2
};
var config = {
  // 正式的请求地址，用于正式会话
  // requestUrl: `https://activity.molixyou.com/`,
  // 测试的请求地址，用于测试会话
  requestUrl: extConfig.siteroot,
  apiKey:'1', 
  appid:extConfig.appid,
  boxId: extConfig.box_id,
  source_id:'1',
  version: "V1.0.0",
  vname:"女神节"
};
module.exports = config
// #endif

// #ifdef MP-WEIXIN
// let extConfig = uni.getExtConfigSync ? uni.getExtConfigSync() : {};
 let extConfig = {
		"appid": "wxe9bf29f9cd9f91c3",
		"box_id": 1,
		"siteroot": "https:\/\/activity.molixyou.com/scrape/",
		"xcx_audit_status":2
};
var config = {
  requestUrl: extConfig.siteroot,
  apiKey:'1', 
  appid:extConfig.appid,
  boxId: extConfig.box_id,
  source_id:'1',
  version: "V1.0.0",
  vname:"女生节"
};
module.exports = config
// #endif
