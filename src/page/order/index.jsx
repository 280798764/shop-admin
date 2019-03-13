import React from 'react'
import { Link } from 'react-router-dom'

import _mm from 'utils/utils.jsx'
import _order from 'service/order-service.jsx'

import PageTitle from 'component/page-title/index.jsx'
import Pagination from 'component/pagination/index.jsx'
import TableList from 'component/table-list/index.jsx'
import ListSearch from './list-search.jsx'


import './index.scss'

class Order extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [],
      pageNum: 1,
      listType: 'list'
    }
  }

  // 初始加载页面
  componentDidMount() {
    this.loadOrdertList()
  }

  // 获取列表
  loadOrdertList() {
    let params = {
      listType: this.state.listType,
      pageNum: this.state.pageNum
    }
    if (this.state.listType === 'search') {
      params.orderNo = this.state.orderNumber
    }
    _order.getOrdertList(params).then(res => {
      this.setState(res)
    }, rej => {
      this.setState({
        list: []
      })
      alert(rej)
    })
  }

  // 搜索事件
  onSearch (orderNumber) {
    let listType = orderNumber === '' ? 'list' : 'search'
    this.setState({
      listType: listType,
      pageNum: 1,
      orderNumber: orderNumber
    }, () => {
      this.loadOrdertList()
    })
  }

  // 改变页数
  onPageChange(pageNum) {
    this.setState({
      pageNum: pageNum
    }, () => {
      this.loadOrdertList()
    })
  }
  render() {
    let tableHeads = ['订单号', '收件人', '订单状态', '订单总价', '创建时间', '操作']
    return (
      <div id="page-wrapper">
        <PageTitle title="订单列表"/>
        <ListSearch onSearch={(orderNumber) => this.onSearch(orderNumber)}></ListSearch>
        <TableList tableHeads={tableHeads}>
          {
            this.state.list.map((item, index) => {
              return (
                <tr key={index}>
                  <td>
                    <Link to={`/order/detail/${item.orderNo}`} className="opear">{item.orderNo}</Link>
                  </td>
                  <td>{item.receiverName}</td>
                  <td>{item.statusDesc}</td>
                  <td>{item.payment}</td>
                  <td>{item.createTime}</td>
                  <td>
                    <p><Link to={`/order/detail/${item.orderNo}`} className="opear">详情</Link></p>
                  </td>
                </tr>
              )
            })
          }
        </TableList>
        <Pagination current={this.state.pageNum} total={this.state.total} onChange={(pageNum) => { this.onPageChange(pageNum) }} />
      </div>)
  }
}

export default Order