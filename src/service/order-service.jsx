import _mm from 'utils/utils.jsx'

class Order{
  getOrdertList (params) {
    let url = '', data = {}
    if (params.listType === 'list') {
      url = '/manage/order/list.do'
      data.pageNum = params.pageNum
    } else if (params.listType === 'search') {
      url = '/manage/order/search.do'
      data.pageNum = params.pageNum
      data.orderNo = params.orderNo
    }
    return _mm.request({
      type: 'post',
      url: url,
      data: data
    })
  }
  getOrderDetail (orderNo) {
    return _mm.request({
      type: 'post',
      url: '/manage/order/detail.do',
      data: {
        orderNo: orderNo
      }
    })
  }
  sendGoods (orderNo) {{
    return _mm.request({
      type: 'post',
      url: '/manage/order/send_goods.do',
      data: {
        orderNo: orderNo
      }
    })
  }}
}

export default new Order()