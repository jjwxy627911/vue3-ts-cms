import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { myReq } from './services'
// 按需要引入 element-plus
import { globalRegister } from './global'
// import ElementPlus from 'element-plus'
// import 'element-plus/lib/theme-chalk/index.css'
import 'element-plus/theme-chalk/index.css'
import 'normalize.css'
import './assets/css/index.less'

const app = createApp(App)

// app.use(ElementPlus)
app.use(globalRegister)
app.use(store)
app.use(router)
app.mount('#app')

// MyReq.request({
//   url: '/category/1',
//   method: 'GET'
// showLoading: false
// interceptors: {
//   requestInterceptor(config) {
//     return config
//   },
//   responseInterceptor(response) {
//     return response
//   }
// }
// })
myReq.get({
  url: '/category/1'
})
