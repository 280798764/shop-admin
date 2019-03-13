import React from 'react'

import PageTitle from 'component/page-title/index.jsx'

import _mm from 'utils/utils.jsx'
import _product from 'service/product-service.jsx'

class CategoryAdd extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			parentId: 0,
			categoryName: '',
			categoryList: []
		}
	}
	componentDidMount() {
		this.loadCategoryList()
	}
	loadCategoryList() {
		_product.getCategoryList().then(res => {
			this.setState({
				categoryList: res
			})
		}, rej => {
			alert(rej)
		})
	}
	onValueChange(e) {
		let name = e.target.name
		let value = e.target.value
		this.setState({
			[name]: value
		})
	}
	onSubmit(e) {
		let categoryName = this.state.categoryName.trim()
		if (categoryName) {
			_product.saveCategory({
				parentId: this.state.parentId,
				categoryName: this.state.categoryName
			}).then(res => {
				alert(res)
				this.props.history.push('/product-category/index')
			}, rej => {
				alert(rej)
			})
		} else {
			alert('请输入商品名称')
		}
	}
	render() {
		return (
			<div id="page-wrapper">
				<PageTitle title="品类列表" />
				<div className="row">
					<div className="ol-md-12">
						<div className="form-horizontal">
							<div className="form-group">
								<label className="col-sm-2 control-label">所属品类</label>
								<div className="col-sm-5">
									<select name="parentId" className="form-control"
										onChange={(e) => this.onValueChange(e)}
									>
										<option value="0">根品类/</option>
										{
											this.state.categoryList.map((item, index) => {
												return <option value={item.id} key={index}>根品类/{item.name}</option>
											})
										}
									</select>
								</div>
							</div>
							<div className="form-group">
								<label className="col-sm-2 control-label">商品名称</label>
								<div className="col-sm-5">
									<input type="text" className="form-control" placeholder="请输入商品名称"
										name="categoryName"
										value={this.state.name}
										onChange={(e) => this.onValueChange(e)}
									/>
								</div>
							</div>
							<div className="form-group">
								<div className="col-sm-offset-2 col-sm-10">
									<button className="btn btn-primary" onClick={(e) => this.onSubmit(e)}>提交</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>)
	}
}

export default CategoryAdd