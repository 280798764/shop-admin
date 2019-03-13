import React from 'react'

import PageTitle from 'component/page-title/index.jsx'
import Pagination from 'component/pagination/index.jsx'

class Order extends React.Component {
  render() {
    return (
      <div id="page-wrapper">
        <PageTitle title="订单列表" />
        <table className="table table-striped">
          <thead>
            <tr role="row">
              <th className="sorting_asc">Rendering engine</th>
              <th className="sorting">Platform(s)</th>
              <th className="sorting">CSS grade</th>
            </tr>
          </thead>
          <tbody>
            <tr className="gradeA odd">
              <td className="sorting_1">Gecko</td>
              <td className="">Firefox 1.0</td>
              <td className="">Win 98+ / OSX.2+</td>
            </tr>
          </tbody>
        </table>
        <Pagination />
      </div>)
  }
}

export default Order