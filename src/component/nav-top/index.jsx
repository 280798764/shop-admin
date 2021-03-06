import React from 'react'
import { Link } from 'react-router-dom'

import _mm from 'utils/utils.jsx'
import _user from 'service/user-service.jsx'

class NavTop extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: _mm.getStorange('userInfo').username || ''
    }
  }
  // 退出登录
  onLogout() {
    _user.userLogout().then(res => {
      _mm.removeStorange('userInfo')
      window.location.href = '/login'
    }, rej => {
      alert(rej)
    })
  }
  render() {
    return (
      <div className="navbar navbar-default top-navbar">
        <div className="navbar-header">
          <Link className="navbar-brand" to="/"><b>HAPPY</b>MALL</Link>
        </div>
        <ul className="nav navbar-top-links navbar-right">
          <li className="dropdown">
            <a className="dropdown-toggle" href="javascript:void(0);" aria-expanded="false">
              <i className="fa fa-user fa-fw"></i>
              {
                this.state.username ? <span>欢迎你, {this.state.username}</span> : <span>欢迎你</span>
              }
              <i className="fa fa-caret-down"></i>
            </a>
            <ul className="dropdown-menu dropdown-user">
              <li>
                <a onClick={() => this.onLogout()}>
                  <i className="fa fa-sign-out fa-fw"></i>
                  <span>退出登录</span>
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    )
  }
}

export default NavTop