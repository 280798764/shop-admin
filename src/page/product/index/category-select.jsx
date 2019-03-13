import React from 'react'
import _product from 'service/product-service.jsx'

import './category-select.scss'

class CategorySelect extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      firstCategoryList: [],
      firstCategoryId: 0,
      secondCategoryList: [],
      secondCategoryId: 0
    }
  }
  componentDidMount() {
    this.loadFirstCategory()
  }
  componentWillReceiveProps(nextProps) {
    let categoryIdChange = this.props.categoryId !== nextProps.categoryId
    let parentCategoryIdChange = this.props.parentCategoryId !== nextProps.parentCategoryId
    if (!categoryIdChange && !parentCategoryIdChange) {
      return
    }
    if (nextProps.parentCategoryId === 0) {
      this.setState({
        firstCategoryId: nextProps.categoryId,
        secondCategoryId: 0
      })
    } else {
      this.setState({
        firstCategoryId: nextProps.parentCategoryId,
        secondCategoryId: nextProps.categoryId
      }, () => {
        parentCategoryIdChange && this.loadsecondCategory()
      })
    }
  }
  // 加载一级分类
  loadFirstCategory() {
    _product.getCategoryList().then(res => {
      this.setState({
        firstCategoryList: res
      })
    }, rej => {
      alert(rej)
    })
  }
  // 加载二级分类
  loadsecondCategory() {
    _product.getCategoryList(this.state.firstCategoryId).then(res => {
      this.setState({
        secondCategoryList: res
      })
    }, rej => {
      alert(rej)
    })
  }
  // 选择的结果
  onPropsCategoryChange() {
    let onCategoryChangeable = typeof this.props.onCategoryChange === 'function'
    if (this.state.secondCategoryId) {
      // 有二级分类
      onCategoryChangeable && this.props.onCategoryChange(this.state.secondCategoryId, this.state.firstCategoryId)
    } else {
      // 一级分类
      onCategoryChangeable && this.props.onCategoryChange(this.state.firstCategoryId, 0)
    }
  }
  // 选择一级分类
  onFirstCategoryChange(e) {
    if (this.props.readOnly) {
      return
    }
    let newValue = e.target.value
    this.setState({
      firstCategoryId: newValue || 0,
      secondCategoryId: 0,
      secondCategoryList: []
    }, () => {
      this.loadsecondCategory()
      this.onPropsCategoryChange()
    })
  }
  // 选择二级分类
  onSecondCategoryChange(e) {
    if (this.props.readOnly) {
      return
    }
    let newValue = e.target.value
    this.setState({
      secondCategoryId: newValue || 0,
    }, () => {
      this.onPropsCategoryChange()
    })
  }
  render() {
    return (<div>
      <select className="form-control cate-select"
        value={this.state.firstCategoryId}
        onChange={(e) => { this.onFirstCategoryChange(e) }}
        readOnly={this.props.readOnly}
      >
        <option value="">请选择一级分类</option>
        {
          this.state.firstCategoryList.map((item, index) => <option value={item.id} key={index} >{item.name}</option>)
        }
      </select>
      {this.state.secondCategoryList.length ?
        (<select className="form-control cate-select"
          value={this.state.secondCategoryId}
          readOnly={this.props.readOnly}
          onChange={(e) => { this.onSecondCategoryChange(e) }}
        >
          <option value="">请选择二级分类</option>
          {
            this.state.secondCategoryList.map((item, index) => <option value={item.id} key={index} >{item.name}</option>)
          }
        </select>) : null
      }
    </div>)
  }
}
export default CategorySelect