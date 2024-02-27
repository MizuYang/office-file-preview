import { createApp } from 'vue'
import router from './router'

import { createPinia } from 'pinia'

import 'bootstrap'

import App from './App.vue'

// import Spreadsheet from '../node_modules/x-data-spreadsheet'
// import zhCN from '../node_modules/x-data-spreadsheet/dist/locale/zh-cn'
// console.log('Spreadsheet', Spreadsheet)
// console.log('zhCN', zhCN)

// Spreadsheet.locale('zh-cn', zhCN)

const pinia = createPinia()
const app = createApp(App)

app.use(router)
app.use(pinia)

app.mount('#app')
