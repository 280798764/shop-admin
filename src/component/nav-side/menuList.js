let menuList = [
  {
    path: '/',
    name: '首页',
    isOpen: false,
    icon: 'fa fa-bar-chart-o',
    subMenu: []
  },
  {
    path: '/product',
    name: '商品中心',
    isOpen: true,
    icon: 'fa fa-list',
    subMenu: [{
      path: '/product',
      name: '商品管理'
    }, {
      path: '/product-category',
      name: '品类管理'
    }]
  },
  {
    path: '/order/index',
    name: '订单中心',
    isOpen: true,
    icon: 'fa fa-check-square-o fa-fw',
    subMenu: [{
      path: '/order/index',
      name: '订单管理'
    }]
  },
  {
    path: '/user',
    name: '用户中心',
    isOpen: true,
    icon: 'fa fa-user-o fa-fw',
    subMenu: [{
      path: '/user',
      name: '用户中心'
    }]
  }
]


export default menuList