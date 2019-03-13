import React from 'react'

class ListSearch extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchType: 'productId',
      searchKeyWord: ''
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
    this.props.onSearch(this.state.searchType, this.state.searchKeyWord)
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
              <select className="form-control"
                name="searchType"
                onChange={(e) => this.onValueChange(e)}>
                <option value="productId">按商品ID查询</option>
                <option value="productName">按商品名称查询</option>
              </select>
            </div>
            <div className="form-group">
              <label className="sr-only">Password</label>
              <input type="text" className="form-control" placeholder="关键词"
                name="searchKeyWord"
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