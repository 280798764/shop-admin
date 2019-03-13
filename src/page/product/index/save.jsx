import React from 'react'
import PageTitle from 'component/page-title/index.jsx'
import RichEditor from 'component/rich-editor/index.jsx'
import FileUpLoader from 'component/file-upload/index.jsx'
import CategorySelect from './category-select.jsx'

import _product from 'service/product-service.jsx'

import './save.scss'

class ProductSave extends React.Component {
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
  componentDidMount () {
    this.loadProduct()
  }
  // 编辑状态加载商品详情
  loadProduct () {
    if (this.state.id) {
      _product.getProduct(this.state.id).then(res => {
        let images = res.subImages.split(',')
        res.subImages = images.map((imgUri) => {
          return {
            uri: imgUri,
            url: res.imageHost + imgUri
          }
        })
        res.defaultDetail = res.detail
        this.setState(res)
      }, rej => {
        alert(rej)
      })
    }
  }
  // 输入框改变
  valueChange(e) {
    let name = e.target.name, value = e.target.value.trim()
    this.setState({
      [name]: value
    })
  }
  onCategoryChange(categoryId, parentCategoryId) {
    this.setState({
      categoryId: categoryId,
      parentCategoryId: parentCategoryId
    })
  }
  onRichEditorChange(value) {
    this.setState({
      detail: value
    })
  }
  // 上传图片成功
  onUpLoadSuccess(res) {
    let subImages = this.state.subImages
    subImages.push(res)
    this.setState({
      subImages: subImages
    })
  }
  // 上传图片失败
  onUpLoadError(error) {
    alert(error.messge || '上传图片失败')
  }
  // 处理图片
  getSubImagsString() {
    return this.state.subImages.map((image) => image.uri).join(',')
  }
  // 删除图片
  onImgDelete (e, index) {
    let subImages = this.state.subImages
    subImages.splice(index, 1)
    this.setState({
      subImages: subImages
    })
  }
  // 提交
  onSubmit() {
    let product = {
      name: this.state.name,
      subtitle: this.state.subtitle,
      subImages: this.getSubImagsString(),
      price: parseFloat(this.state.price),
      stock: parseInt(this.state.stock),
      detail: this.state.detail,
      status: this.state.status,
      categoryId: parseInt(this.state.categoryId)
    }
    let checkResult = _product.checkProduct(product)
    if (this.state.id) {
      product.id = this.state.id
    }
    if (checkResult.status) {
      _product.saveProduct(product).then(res => {
        alert(res)
        this.props.history.push('/product/index')
      }, rej => {
        alert(rej)
      })
    } else {
      alert(checkResult.msg)
    }
  }
  render() {
    return (
      <div id="page-wrapper">
        <PageTitle title={this.state.id ? '编辑商品' : '添加商品'} />
        <div className="form-horizontal">
          <div className="form-group">
            <label className="col-sm-2 control-label">商品名称</label>
            <div className="col-sm-5">
              <input type="text" className="form-control" placeholder="请输入商品名称"
                name="name"
                value={this.state.name}
                onChange={(e) => this.valueChange(e)}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-2 control-label">商品描述</label>
            <div className="col-sm-5">
              <input type="text" className="form-control" placeholder="请输入商品描述"
                name="subtitle"
                value={this.state.subtitle}
                onChange={(e) => this.valueChange(e)}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-2 control-label">所属分类</label>
            <div className="col-sm-10">
              <CategorySelect 
              categoryId={this.state.categoryId}
              parentCategoryId={this.state.parentCategoryId}
              onCategoryChange={(categoryId, parentCategoryId) =>
                this.onCategoryChange(categoryId, parentCategoryId)
              } />
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-2 control-label">商品价格</label>
            <div className="col-sm-2">
              <div className="input-group">
                <input type="number" className="form-control" placeholder="请输入商品价格"
                  name="price"
                  value={this.state.price}
                  onChange={(e) => this.valueChange(e)}
                />
                <span className="input-group-addon">元</span>
              </div>
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-2 control-label">商品库存</label>
            <div className="col-sm-2">
              <div className="input-group">
                <input type="number" className="form-control" placeholder="请输入商品库存"
                  name="stock"
                  value={this.state.stock}
                  onChange={(e) => this.valueChange(e)}
                />
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
                <img src={item.url}/>
                <i className="fa fa-close" onClick={(e) => this.onImgDelete(e, index)}></i>
              </div>)) : (<div>请上传图片</div>)
            }
            </div>
            <div className="col-sm-10 col-md-offset-2">
              <FileUpLoader 
                onSuccess={(res) => this.onUpLoadSuccess(res)}
                onError={(error) => this.onUpLoadError(error)}/>
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-2 control-label">商品详情</label>
            <div className="col-sm-10">
              <RichEditor
                detail={this.state.detail}
                defaultDetail={this.state.defaultDetail}
                onValueChange={(value) => this.onRichEditorChange(value)} />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
              <button className="btn btn-primary" onClick={(e) => this.onSubmit(e)}>提交</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default ProductSave