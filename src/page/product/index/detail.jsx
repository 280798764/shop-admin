import React from 'react'
import PageTitle from 'component/page-title/index.jsx'
import CategorySelect from './category-select.jsx'

import _product from 'service/product-service.jsx'

import './save.scss'

class ProductDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      id: this.props.match.params.pid,
      name: '',
      subtitle: '',
      subImages: [],
      price: 0,
      stock: '',
      detail: '',
      status: 1,
      categoryId: 0,
      parentCategoryId: 0
    }
  }
  componentDidMount() {
    this.loadProduct()
  }
  // 编辑状态加载商品详情
  loadProduct() {
    if (this.state.id) {
      _product.getProduct(this.state.id).then(res => {
        let images = res.subImages.split(',')
        res.subImages = images.map((imgUri) => {
          return {
            uri: imgUri,
            url: res.imageHost + imgUri
          }
        })
        this.setState(res)
      }, rej => {
        alert(rej)
      })
    }
  }
  render() {
    return (
      <div id="page-wrapper">
        <PageTitle title="商品详情" />
        <div className="form-horizontal">
          <div className="form-group">
            <label className="col-sm-2 control-label">商品名称</label>
            <div className="col-sm-5">
              <p className="form-contorl-static">{this.state.name}</p>
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-2 control-label">商品描述</label>
            <div className="col-sm-5">
              <p className="form-contorl-static">{this.state.subtitle}</p>
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-2 control-label">所属分类</label>
            <div className="col-sm-10">
              <CategorySelect
                readOnly
                categoryId={this.state.categoryId}
                parentCategoryId={this.state.parentCategoryId} />
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-2 control-label">商品价格</label>
            <div className="col-sm-2">
              <div className="input-group">
                <input type="number" className="form-control" readOnly value={this.state.price} />
                <span className="input-group-addon">元</span>
              </div>
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-2 control-label">商品库存</label>
            <div className="col-sm-2">
              <div className="input-group">
                <input type="number" className="form-control" readOnly value={this.state.stock} />
                <span className="input-group-addon">件</span>
              </div>
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-2 control-label">商品图片</label>
            <div className="col-sm-10">
              {
                this.state.subImages.length ?
                  this.state.subImages.map((item, index) => (<div key={index} className="img-con">
                    <img src={item.url} />
                  </div>)) : (<div>暂无图片</div>)
              }
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-2 control-label">商品详情</label>
            <div className="col-sm-10" dangerouslySetInnerHTML={{__html: this.state.detail}}></div>
          </div>
        </div>
      </div>
    )
  }
}
export default ProductDetail