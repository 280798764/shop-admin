import React from 'react'
import PageTitle from 'component/page-title/index.jsx'

import _order from 'service/order-service.jsx'

import TableList from 'component/table-list/index.jsx'

import './detail.scss'

class OrderDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      id: this.props.match.params.orderNumber,
      orderInfo: {
        shippingVo: {},
        orderItemVoList: []
      }
    }
  }
  componentDidMount() {
    this.loadOrderDetail()
  }
  // 加载订单详情
  loadOrderDetail() {
    if (this.state.id) {
      _order.getOrderDetail(this.state.id).then(res => {
        this.setState({
          orderInfo: res
        })
      }, rej => {
        alert(rej)
      })
    }
  }
  onSendGoods () {
    _order.sendGoods(this.state.id).then(res => {
      alert(res)
      this.loadOrderDetail()
    }, rej => {
      alert(rej)
    })
  }
  render() {
    let shippingVo = this.state.orderInfo.shippingVo
    let orderItemVoList = this.state.orderInfo.orderItemVoList
    let tableHeads = [
      {
        name: '商品图片',
        width: '10%'
      },
      {
        name: '商品信息',
        width: '45%'
      },
      {
        name: '单价',
        width: '15%'
      },
      {
        name: '数量',
        width: '15%'
      },
      {
        name: '合计',
        width: '15%'
      }
    ]
    return (
      <div id="page-wrapper">
        <PageTitle title="商品详情" />
        <div className="form-horizontal">
          <div className="form-group">
            <label className="col-sm-2 control-label">订单号</label>
            <div className="col-sm-5">
              <p className="form-contorl-static">{this.state.orderInfo.orderNo}</p>
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-2 control-label">创建时间</label>
            <div className="col-sm-5">
              <p className="form-contorl-static">{this.state.orderInfo.createTime}</p>
            </div>
          </div>
           <div className="form-group">
            <label className="col-sm-2 control-label">收件人</label>
            <div className="col-sm-5">
              <p className="form-contorl-static">
                {shippingVo.receiverName}&nbsp;&nbsp;&nbsp;
                {shippingVo.receiverMobile}&nbsp;&nbsp;&nbsp;
                {shippingVo.receiverProvince}&nbsp;&nbsp;&nbsp;
                {shippingVo.receiverCity}&nbsp;&nbsp;&nbsp;
                {shippingVo.receiverAddress}
              </p>
            </div>
          </div>
         <div className="form-group">
            <label className="col-sm-2 control-label">订单状态</label>
            <div className="col-sm-5">
              <p className="form-contorl-static">{this.state.orderInfo.statusDesc}</p>
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-2 control-label">支付方式</label>
            <div className="col-sm-5">
              <p className="form-contorl-static">
                {this.state.orderInfo.paymentTypeDesc}&nbsp;&nbsp;
                {
                  this.state.orderInfo.status === 20 ?  <button className="btn btn-default btn-sm" 
                  onClick={(e) => {this.onSendGoods(e)}}
                >立即发货</button> : null 
                }
              </p>
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-2 control-label">订单金额</label>
            <div className="col-sm-5">
              <p className="form-contorl-static">¥{this.state.orderInfo.payment}</p>
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-2 control-label">商品列表</label>
            <div className="col-sm-10">
              <TableList tableHeads={tableHeads}>
                {
                  orderItemVoList.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>
                          <img src={`${this.state.orderInfo.imageHost}${item.productImage}`} className="p-img"/>
                        </td>
                        <td>{item.productName}</td>
                        <td>¥{item.currentUnitPrice}</td>
                        <td>{item.quantity}</td>
                        <td>{item.totalPrice}</td>
                      </tr>
                    )
                  })
                }
              </TableList>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default OrderDetail