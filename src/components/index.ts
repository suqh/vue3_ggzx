// 引入项目中全部的全局组件
import type { Component, Plugin } from 'vue'
import SvgIcon from '@/components/SvgIcon/index.vue'
import Pagination from '@/components/Pagination/index.vue'
// 全局对象
const allGlobalComponents: Record<string, Component> = { SvgIcon, Pagination }
// 对外暴露插件对象
const globalComponents: Plugin = {
  install(app) {
    // 注册项目全部的全局组件
    Object.entries(allGlobalComponents).forEach(([key, component]) => {
      app.component(key, component)
    })
  },
}

export default globalComponents
