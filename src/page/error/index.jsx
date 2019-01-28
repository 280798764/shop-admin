import React from 'react'
import { Link } from 'react-router-dom'

import PageTitle from 'component/page-title/index.jsx'

class Error extends React.Component {
  render() {
    return (
      <div id="page-wrapper">
        <PageTitle title="404"/>
        <p>页面走丢了</p>
        <Link to="/">返回首页</Link>
      </div>
    )
  }
}

export default Error