import React from 'react'

class PageTitle extends React.Component {
  render() {
    return (
      <div className="row">
        <h1 className="page-header">{this.props.title}</h1>
      </div>
    )
  }
}

export default PageTitle