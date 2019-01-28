import React from 'react'

import PageTitle from 'component/page-title/index.jsx'

class User extends React.Component {
  render() {
    return (
      <div id="page-wrapper">
        <PageTitle title="用户列表" />
        <table className="table table-striped table-bordered table-hover dataTable no-footer" id="dataTables-example" aria-describedby="dataTables-example_info">
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
              <td className=" ">Firefox 1.0</td>
              <td className=" ">Win 98+ / OSX.2+</td>
            </tr>
          </tbody>
        </table>
      </div>)
  }
}

export default User