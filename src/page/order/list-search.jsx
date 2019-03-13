import React from 'react'

class ListSearch extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      orderNumber: ''
    }
  }
  // 数据变化的时候
  onValueChange(e) {
    let name = e.target.name, value = e.target.value.trim()
    this.setState({
      [name]: value
    })
  }
  // 点击搜索按钮
  onSearch(e) {
    this.props.onSearch(this.state.orderNumber)
  }
  onSearchKeyWordUp(e) {
    if (e.keyCode === 13) {
      this.onSearch()
    }
  }
  render() {
    return (
      <div className="row">
        <div className="search-wrap">
          <div className="form-inline">
            <div className="form-group">
              <select className="form-control">
                <option value="productId">按订单号查询</option>
              </select>
            </div>
            <div className="form-group">
              <label className="sr-only">Password</label>
              <input type="text" className="form-control" placeholder="请输入订单号"
                name="orderNumber"
                onKeyUp={(e) => this.onSearchKeyWordUp(e)}
                onChange={(e) => this.onValueChange(e)} />
            </div>
            <button className="btn btn-primary" onClick={(e) => this.onSearch()}>搜索</button>
          </div>
        </div>
      </div>
    )
  }
}
export default ListSearch