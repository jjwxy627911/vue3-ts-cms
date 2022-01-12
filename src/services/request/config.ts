let BASE_URL = 'http://152.136.185.210:5000'
let BASE_NAME = 'dev'
const TIME_OUT = 1000
// 测试环境
if (process.env.NODE_ENV === 'development') {
  BASE_URL = 'http://152.136.185.210:5000'
  BASE_NAME = 'dev'
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = 'http://152.136.185.210:5000'
  BASE_NAME = 'prd'
} else {
  BASE_URL = 'http://152.136.185.210:5000'
  BASE_NAME = 'test'
}

export { BASE_URL, BASE_NAME, TIME_OUT }
