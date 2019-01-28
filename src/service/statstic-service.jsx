import _mm from 'utils/utils.jsx'

class Statstic {
  getCount(loginInfo) {
    return _mm.request({
      url: '/manage/statistic/base_count.do'
    })
  }
}

export default new Statstic()