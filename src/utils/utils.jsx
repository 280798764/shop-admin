class Utils {
  // 请求
  request (parmas) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: parmas.url || '',
        type: parmas.type || 'get',
        dataType: parmas.dataType || 'json',
        data: parmas.data || null,
        success(res) {
          if (0 === res.status) {
            resolve(res.data, res.msg)
          } else if (10 === res.status) {
            this.doLogin()
          } else {
            reject(res.msg)
          }
        },
        error(err) {
          reject(err.statusText)
        }
      })
    })
  }
  // 返回登陆页
  doLogin () {
    window.location.href = `/login?redirect=${encodeURIComponent(window.location.hostname)}`
  }
  // 获取地址栏参数
  getUrlParmas (name) {
    let queryString = window.location.search.split('?')[1] || ''
    let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
    let result = queryString.match(reg)
    return result ? encodeURIComponent(result[2]) : null
  }
  // 存储Storage
  setStorange (name, data) {
    let dataType = typeof data
    if (dataType === 'object') {
      window.localStorage.setItem(name, JSON.stringify(data))
    } else if (['number', 'string', 'boolean'].indexOf(dataType) >= 0) {
      window.localStorage.setItem(name, data)
    } else {
      alert('该类型不能用于本地存储')
    }
  }
  // 获取Storage
  getStorange (name) {
    let data = window.localStorage.getItem(name)
    if (data) {
      return JSON.parse(data)
    } else {
      return ''
    }
  }
  // 删除Storage
  removeStorange (name) {
    window.localStorage.removeItem(name)
  }
}


export default new Utils()