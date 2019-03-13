import React from 'react'
import { Link } from 'react-router-dom'

import _mm from 'utils/utils.jsx'
import _product from 'service/product-service.jsx'

import PageTitle from 'component/page-title/index.jsx'
import Pagination from 'component/pagination/index.jsx'
import TableList from 'component/table-list/index.jsx'
import ListSearch from './list-search.jsx'


import './index.scss'

class ProductList extends React.Component {
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
    this.loadProductList()
  }

  // 获取列表
  loadProductList() {
    let params = {
      listType: this.state.listType,
      pageNum: this.state.pageNum
    }
    if (this.state.listType === 'search') {
      params.searchType = this.state.searchType
      params.searchKeyWord = this.state.searchKeyWord
    }
    _product.getProductList(params).then(res => {
      this.setState(res)
    }, rej => {
      this.setState({
        list: []
      })
      alert(rej)
    })
  }

  // 搜索事件
  onSearch (searchType, searchKeyWord) {
    let listType = searchKeyWord === '' ? 'list' : 'search'
    this.setState({
      listType: listType,
      pageNum: 1,
      searchType: searchType,
      searchKeyWord: searchKeyWord
    }, () => {
      this.loadProductList()
    })
  }

  // 改变页数
  onPageChange(pageNum) {
    this.setState({
      pageNum: pageNum
    }, () => {
      this.loadProductList()
    })
  }

  // 改变商品状态
  onSetProductStatus (e, id, status) {
    let newStatus =  status === 1 ? 2 : 1
    let confirmTips = status === 1 ? '确定要下架该商品么' : '确定要上架该商品么'
    if (window.confirm(confirmTips)) {
      _product.setSaleStatus({
        productId: id,
        status: newStatus
      }).then(res => {
        alert(res)
        this.loadProductList()
      }, rej => {
        alert(rej)
      })
    }
  }

  render() {
    let tableHeads = [
      {
        name: '商品ID',
        width: '10%'
      },
      {
        name: '商品信息',
        width: '50%'
      },
      {
        name: '商品价格',
        width: '10%'
      },
      {
        name: '商品状态',
        width: '15%'
      },
      {
        name: '操作',
        width: '15%'
      }
    ]
    return (
      <div id="page-wrapper">
        <PageTitle title="商品列表"/>
        <div className="page-header-right" style={{textAlign: 'right'}}>
          <Link className="btn btn-primary" to="/product/save">
            <i className="fa fa-plus"></i>
            <span>添加商品</span>
          </Link>
        </div>
        <ListSearch onSearch={(searchType, searchKeyWord) => this.onSearch(searchType, searchKeyWord)}></ListSearch>
        <TableList tableHeads={tableHeads}>
          {
            this.state.list.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.id}</td>
                  <td>
                    <p>{item.name}</p>
                    <p>{item.subtitle}</p>
                  </td>
                  <td>¥{item.price}</td>
                  <td>
                    <span>{item.status == 1 ? '在售': '下架'}</span>
                    <button className="btn btn-xs btn-warning" onClick={(e) => this.onSetProductStatus(e, item.id, item.status)}>{item.status == 1 ? '下架': '上架'}</button>
                  </td>
                  <td>
                    <p><Link to={`/product/detail/${item.id}`}>查看详情</Link></p>
                    <p><Link to={`/product/save/${item.id}`}>编辑</Link></p>
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

export default ProductList