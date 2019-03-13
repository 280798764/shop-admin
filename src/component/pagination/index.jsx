import React from 'react'
import RcPagination from 'rc-pagination'
import 'rc-pagination/dist/rc-pagination.min.css'

class Pagination extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="row">
        <div className="col-d-12">
        <RcPagination {...this.props}
          hideOnSinglePage
          showQuickJumper/>
        </div>
      </div>)
  }
}

export default Pagination