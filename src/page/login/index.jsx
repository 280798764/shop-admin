import React from 'react'
import _mm from 'utils/utils.jsx'
import _user from 'service/user-service.jsx'

import './index.scss'

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      redirect: '/'
    }
  }
  onInputChange(e) {
    let inputName = e.target.name
    let inputValue = e.target.value
    this.setState({
      [inputName]: inputValue
    })
  }
  // 回车事件
  onInputKeyUp (e) {
    if (e.keyCode === 13) {
      this.onLogin()
    }
  }
  componentWillMount () {
    document.title = '登录'
  }
  // 登录按钮
  onLogin() {
    let userInfo = {
      username: this.state.username,
      password: this.state.password
    }
    let checkResult = _user.checkLoginInfo(userInfo)
    if (checkResult.status) {
      _user.userLogin(userInfo).then(res => {
        _mm.setStorange('userInfo', JSON.stringify(res))
        this.props.history.push(this.state.redirect)
      }, rej => {
        alert(rej)
      })
    } else {
      alert(checkResult.msg)
    }
  }
  render() {
    return (
      <div className="col-md-4 col-md-offset-4">
        <div className="panel panel-default login-panel">
          <div className="panel-heading">欢迎登录 -- MMALL管理系统</div>
          <div className="panel-body">
            <div onKeyUp={e => this.onInputKeyUp(e)}>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">用户名</label>
                <input type="text" name="username" className="form-control" placeholder="请输入用户名" onChange={e => this.onInputChange(e)} />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">密码</label>
                <input type="password" name="password" className="form-control" placeholder="请输入密码" onChange={e => this.onInputChange(e)} />
              </div>
              <button className="btn btn-primary btn-lg btn-block" onClick={e => { this.onLogin(e) }}>登陆</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Login