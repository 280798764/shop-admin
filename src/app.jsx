import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Layout from 'component/layout/index.jsx'

import Login from 'page/login/index.jsx'
import Home from 'page/home/index.jsx'
import User from 'page/user/index.jsx'
import Order from 'page/order/index.jsx'
import Product from 'page/product/index.jsx'
import ProductClassify from 'page/product/ProductClassify.jsx'
import ErrorPage from 'page/error/index.jsx'

class App extends React.Component {
  render() {
    return (<div>
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/" render={props => (
            <Layout>
              <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/user" component={User}/>
                <Route path="/order" component={Order}/>
                <Route path="/product" component={Product}/>
                <Route path="/product-classify" component={ProductClassify}/>
                <Route component={ErrorPage} />
              </Switch>
            </Layout>
          )}/>
        </Switch>
      </Router>
    </div>)
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)