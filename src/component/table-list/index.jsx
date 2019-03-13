import React from 'react'

class TableList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      firstLoading: true
    }
  }
  componentWillReceiveProps () {
    this.setState({
      firstLoading: false
    })
  }
  render() {
    let tableHeads = this.props.tableHeads.map((item, index) => {
      if (typeof item === 'object') {
        return  <th key={index} width={item.width}>{item.name}</th>
      } else if (typeof tableHeads === 'string') {
        return  <th key={index}>{item}</th>
      }
    })
    let listBody = this.props.children
    let listInfo = (
      <tr>
        <td colSpan={this.props.tableHeads.length} align="center">{this.state.firstLoading ? '正在加载...' : '没有搜索结果'}</td>
      </tr>
    )
    let tableBody = listBody.length > 0 ? listBody : listInfo
    return (
      <div className="row">
        <div className="col-d-12">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>{tableHeads}</tr>
            </thead>
            <tbody>{tableBody}</tbody>
          </table>
        </div>
      </div>)
  }
}

export default TableList