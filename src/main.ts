import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 按需要引入 element-plus
// import { globalRegister } from './global'

const app = createApp(App)

// app.use(globalRegister)
app.use(store)
app.use(router)
app.mount('#app')
