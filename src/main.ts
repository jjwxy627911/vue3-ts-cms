import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { MyReq } from './services'
// 按需要引入 element-plus
import { globalRegister } from './global'

const app = createApp(App)

app.use(globalRegister)
app.use(store)
app.use(router)
app.mount('#app')

MyReq.request({
  url: '/category/1',
  method: 'GET'
  // interceptors: {
  //   requestInterceptor(config) {
  //     return config
  //   },
  //   responseInterceptor(response) {
  //     return response
  //   }
  // }
})
// MyReq2.get()
