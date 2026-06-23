import { createApp } from 'vue'
import App from '@/App.vue'
// 引入element-plus插件与样式
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

const app = createApp(App)
app.use(ElementPlus, {
  locale: zhCn,
})
// svg插件需要配置代码
import 'virtual:svg-icons-register'
// 引入自定义插件对象：注册整个项目全局组件
import globalComponents from '@/components'
// 安装自定义插件
app.use(globalComponents)
// 引入模版的全局样式
import '@/styles/index.scss'

// 将应用挂载到挂载点上
app.mount('#app')
