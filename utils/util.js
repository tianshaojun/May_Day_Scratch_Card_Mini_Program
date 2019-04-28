const formatTime = date => {
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()

  let hour = date.getHours()
  let minute = date.getMinutes()
  let second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const isFunction = val => (typeof val === 'function');

const showLoading = (text, typeKey, time) => {
  wx.showToast({
    title: text,
    icon: typeKey,
    duration: time,
    complete: function () { }
  })
}

const hideToast = () => wx.hideToast();

const getWindowSize = () => {
  const data = {}
  uni.getSystemInfo({
    success: res => {
      console.log(res)
      data.platform = res.platform
      data.model = res.model
			data.pixelRatio=res.pixelRatio
      data.wWidth = res.screenWidth
      data.wHeight = res.screenHeight
      data.scale = res.screenWidth/750 
    }
  })
  return data
}

function savePicToAlbum(tempFilePath,that) {
  wx.getSetting({
    success(res) {
      if (!res.authSetting['scope.writePhotosAlbum']) {
        wx.authorize({
          scope: 'scope.writePhotosAlbum',
          success() {
            wx.saveImageToPhotosAlbum({
              filePath: tempFilePath,
              success(res) {
                wx.showToast({
                  title: '保存成功'
                });
                that.setData({
                  codeView:false
                })
              },
              fail(res) {
                console.log(res);
              }
            })
          },
          fail() {
            // 用户拒绝授权,打开设置页面
            wx.openSetting({
              success: function (data) {
                console.log("openSetting: success");
              },
              fail: function (data) {
                console.log("openSetting: fail");
              }
            });
          }
        })
      } else {
        wx.saveImageToPhotosAlbum({
          filePath: tempFilePath,
          success(res) {
            wx.showToast({
              title: '保存成功',
            });
            that.setData({
              codeView: false
            })
          },
          fail(res) {
            console.log(res);
          }
        })
      }
    },
    fail(res) {
      console.log(res);
    }
  })
}
module.exports = {
  formatTime,
  isFunction,
  showLoading,
  hideToast,
  getWindowSize,
  savePicToAlbum
}
