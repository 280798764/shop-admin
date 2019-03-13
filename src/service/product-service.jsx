import _mm from 'utils/utils.jsx'

class Product {
  // 商品列表
  getProductList (params) {
    let url = '', data = {}
    if (params.listType === 'list') {
      url = '/manage/product/list.do'
      data.pageNum = params.pageNum
    } else if (params.listType === 'search') {
      url = '/manage/product/search.do'
      data.pageNum = params.pageNum
      data[params.searchType] = params.searchKeyWord
    }
    return _mm.request({
      type: 'post',
      url: url,
      data: data
    })
  }
  // 商品上下架
  setSaleStatus (productInfo) {
    return _mm.request({
      type: 'post',
      url:'/manage/product/set_sale_status.do',
      data: productInfo
    })
  }
  // 品类相关
  getCategoryList (parentCategoryId) {
    return _mm.request({
      type: 'post',
      url:'/manage/category/get_category.do',
      data: {
        categoryId: parentCategoryId || 0
      }
    })
  }
  // 保存商品
  saveProduct (product) {
    return _mm.request({
      type: 'post',
      url:'/manage/product/save.do',
      data: product
    })
  }
  // 商品详情
  getProduct (id) {
    return _mm.request({
      type: 'post',
      url:'/manage/product/detail.do',
      data: {
        productId: id || 0
      }
    })
  }
  // 修改品类
  updateCategoryName (category) {
    return _mm.request({
      type: 'post',
      url:'/manage/category/set_category_name.do',
      data: category
    })
  }
  saveCategory (category) {
    return _mm.request({
      type: 'post',
      url:'/manage/category/add_category.do',
      data: category
    })
  }
  // 保存商品检查表单
  checkProduct(product) {
    let result = {
      status: true,
      msg: '通过验证'
    }
    // 判断商品名称
    if (typeof product.name !== 'string' || product.name.length === 0) {
      return {
        status: false,
        msg: '商品名称不能为空'
      }
    }
    // 判断商品描述
    if (typeof product.subtitle !== 'string' || product.subtitle.length === 0) {
      return {
        status: false,
        msg: '商品描述不能为空'
      }
    }
    // 判断品类Id
    if (typeof product.categoryId !== 'number' || !(product.categoryId > 0)) {
      return {
        status: false,
        msg: '请选择品类'
      }
    }
    // 判断商品价格
    if (typeof product.price !== 'number' || !(product.price >= 0)) {
      return {
        status: false,
        msg: '请输入正确的商品价格'
      }
    }
    // 判断商品库存
    if (typeof product.stock !== 'number' || !(product.stock >= 0)) {
      return {
        status: false,
        msg: '请输入正确的库存'
      }
    }
    return result
  }
}

export default new Product()