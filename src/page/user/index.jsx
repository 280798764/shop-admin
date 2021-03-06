import React from 'react'

import _mm from 'utils/utils.jsx'
import _user from 'service/user-service.jsx'

import PageTitle from 'component/page-title/index.jsx'
import Pagination from 'component/pagination/index.jsx'
import TableList from 'component/table-list/index.jsx'

class User extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [],
      pageNum: 1
    }
  }
  componentDidMount() {
    this.loadUserList()
  }
  loadUserList() {
    _user.getUserList(this.state.pageNum).then(res => {
      this.setState(res)
    }, rej => {
      this.setState({
        list: []
      })
      alert(rej)
    })
  }

  onPageChange(pageNum) {
    this.setState({
      pageNum: pageNum
    }, () => {
      this.loadUserList()
    })
  }

  render() {
    let listBody = this.state.list.map((item, index) => {
      return (
        <tr key={index}>
          <td>{item.id}</td>
          <td>{item.username}</td>
          <td>{item.email}</td>
          <td>{item.phone}</td>
          <td>{new Date(item.createTime).toLocaleString()}</td>
        </tr>
      )
    })
    let listError = (
      <tr>
        <td colSpan="5" align="center">{this.state.firstLoading ? '正在加载...': '没有搜索结果'}</td>
      </tr>
    )
    let tableBody = this.state.list.length > 0 ? listBody : listError
    return (
      <div id="page-wrapper">
        <PageTitle title="用户列表" />
        <TableList tableHeads={['ID', '用户名', '邮箱', '电话', '注册时间']}>{ tableBody }</TableList>
        <Pagination current={this.state.pageNum} total={this.state.total} onChange={(pageNum) => { this.onPageChange(pageNum) }} />
      </div>)
  }
}

export default User