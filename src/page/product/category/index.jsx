import React from 'react'

import _mm from 'utils/utils.jsx'
import _user from 'service/user-service.jsx'

import PageTitle from 'component/page-title/index.jsx'
import TableList from 'component/table-list/index.jsx'

class CateGoryList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [],
      parentCategoryId: this.props.match.params.categoryId || 0
    }
  }
  componentDidMount() {
    this.loadCateGoryList()
  }
  loadUserList() {
    _user.loadCateGoryList(this.state.parentCategoryId).then(res => {
      this.setState(res)
    }, rej => {
      this.setState({
        list: []
      })
      alert(rej)
    })
  }

  render() {
    let listBody = this.state.list.map((item, index) => {
      return (
        <tr key={index}>
          <td>{item.id}</td>
          <td>{item.username}</td>
          <td>{item.email}</td>
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
        <TableList tableHeads={['品类ID', '品类名称', '操作']}>{ tableBody }</TableList>
        <Pagination current={this.state.pageNum} total={this.state.total} onChange={(pageNum) => { this.onPageChange(pageNum) }} />
      </div>)
  }
}

export default CateGoryList