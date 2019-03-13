import React from 'react'
import { Link } from 'react-router-dom'

import _mm from 'utils/utils.jsx'
import _product from 'service/product-service.jsx'

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
    this.loadCategoryList()
  }
  componentDidUpdate (prevProps, prevState) {
    let oldPath = prevProps.location.pathname
    let newPath = this.props.location.pathname
    let newId = this.props.match.params.categoryId || 0
    if (oldPath !== newPath) {
      this.setState({
        parentCategoryId: newId
      }, () => {
        this.loadCategoryList()
      })
    }
  }
  loadCategoryList() {
    _product.getCategoryList(this.state.parentCategoryId).then(res => {
      this.setState({
        list: res
      })
    }, rej => {
      this.setState({
        list: []
      })
      alert(rej)
    })
  }
  updateCategoryName (id, name) {
    let newName = window.prompt('请输入新的品类名称', name)
    if (newName) {
      _product.updateCategoryName({
        categoryId: id,
        categoryName: newName
      }).then(res => {
        alert(res)
        this.loadCategoryList()
      },rej => {
        alert(rej)
      })
    }
  }
  render() {
    let listBody = this.state.list.map((item, index) => {
      return (
        <tr key={index}>
          <td>{item.id}</td>
          <td>{item.name}</td>
          <td>
            <a className="opear" onClick={(e) => this.updateCategoryName(item.id, item.name)}>修改名称 </a>
            {
              item.parentId === 0 ? <Link to={`/product-category/index/${item.id}`}>查看子类</Link> : null
            }
          </td>
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
        <PageTitle title="品类管理" />
        <div className="page-header-right" style={{textAlign: 'right'}}>
          <Link className="btn btn-primary" to="/product-category/add">
            <i className="fa fa-plus"></i>
            <span>添加品类</span>
          </Link>
        </div>
        <TableList tableHeads={['品类ID', '品类名称', '操作']}>{ tableBody }</TableList>
      </div>)
  }
}

export default CateGoryList