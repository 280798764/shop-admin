import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'


import ProductList from 'page/product/index/index.jsx'
import ProductSave from 'page/product/index/save.jsx'
import ProductDetail from 'page/product/index/detail.jsx'
import Category from 'page/product/category/index.jsx'
import CategoryAdd from 'page/product/category/add.jsx'

class ProductRouter extends React.Component {
  render() {
    return (<div>
        <Switch>
          <Route path="/product/index" component={ProductList} />
          <Route path="/product/save/:pid?" component={ProductSave} />
          <Route path="/product/detail/:pid?" component={ProductDetail} />
          <Route path="/product-category/index/:categoryId?" component={Category} />
          <Route path="/product-category/add" component={CategoryAdd} />
          <Redirect exact from="/product" to="/product/index" />
          <Redirect exact from="/product-category" to="/product-category/index" />
        </Switch>
    </div>)
  }
}
export default ProductRouter