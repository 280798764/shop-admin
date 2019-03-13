import _mm from 'utils/utils.jsx'

class User {
  userLogin(loginInfo) {
    return _mm.request({
      type: 'post',
      url: '/manage/user/login.do',
      data: loginInfo
    })
  }
  userLogout () {
    return _mm.request({
      type: 'post',
      url: '/user/logout.do',
    })
  }
  getUserList (pageNum) {
    return _mm.request({
      type: 'post',
      url:'/manage/user/list.do',
      data: {
        pageNum: pageNum
      }
    })
  }
  // 检查登陆接口是否合法
  checkLoginInfo (loginInfo) {
    let username = $.trim(loginInfo.username)
    let password = $.trim(loginInfo.password)
    if (typeof username !== 'string' || username === '') {
      return {
        status: false,
        msg: '用户名不能为空'
      }
    }
    if (typeof password !== 'string' || password === '') {
      return {
        status: false,
        msg: '密码不能为空'
      }
    }
    return {
      status: true
    }
  }
}

export default new User()