<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0">占位的文字</el-col>
      <el-col :span="12" :xs="24">
        <el-form class="login_form" :model="loginForm" :rules="rules" ref="loginForms">
          <h1>Hello</h1>
          <h2>欢迎来到硅谷甄选</h2>
          <el-form-item prop="username">
            <el-input :prefix-icon="User" v-model="loginForm.username"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" :prefix-icon="Lock" show-password v-model="loginForm.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button :loading="loading" class="login_btn" type="primary" @click="login">登录</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'
// 引入获取当前时间的函数
import { getTime } from '@/utils/time'
// 引入用户相关的小仓库
import useUserStore from '@/store/modules/user'
let useStore = useUserStore()
// 获取el-form组件
let loginForms = ref()
// 获取路由器
let $router = useRouter()
// 定义一个变量控制按钮加载效果
let loading = ref(false)
// 收集账号与密码的数据
let loginForm = reactive({ username: 'admin', password: '111111' })

const login = async () => {
  // 保证全部表单验证通过再发请求
  await loginForms.value.validate()
  loading.value = true
  try {
    await useStore.userLogin(loginForm)
    // 编程式导航跳转到展示数据首页
    $router.push('/')
    // 登录成功提示信息
    ElNotification({
      type: 'success',
      message: '欢迎回来',
      title: `HI, ${getTime()}好`,
    })
    // 登录成功加载效果消失
    loading.value = false
  } catch (error) {
    // 登录失败加载效果消失
    loading.value = false
    // 登录失败提示信息
    ElNotification({
      type: 'error',
      message: (error as Error).message,
    })
  }
}

const validatorUserName = (rule: any, value: any, callback: any) => {
  // rule: 即为校验规则对象
  // value: 即为表单元素文本内容
  console.log(callback)
  // 函数：如果符合条件callback放行通过
  // 如果不符合条件callback方法，注入错误提示信息
  if (/^\d{5,10}$/.test(value)) {
    callback()
  } else {
    callback(new Error('账号长度至少五位'))
  }
}

const validatorPassWord = (rule: any, value: any, callback: any) => {
  if (value.length >= 6) {
    callback()
  } else {
    callback(new Error('密码长度至少六位'))
  }
}

// 定义表单校验需要配置对象
const rules = {
  username: [
    // {required: true, min:6, max:10, message: '账号长度至少六位', trigger: 'change'}
    { validator: validatorUserName, trigger: 'change' },
  ],
  password: [
    // {required: true, min:6, max:15, message: '密码长度至少六位', trigger: 'change'}
    { validator: validatorPassWord, trigger: 'change' },
  ],
}
</script>

<style scoped>
.login_container {
  width: 100%;
  height: 100vh;
  background: url('@/assets/images/background.jpg') no-repeat;
  background-size: cover;
  .login_form {
    position: relative;
    width: 80%;
    top: 30vh;
    background: url('@/assets/images/login_form.png') no-repeat;
    background-size: cover;
    padding: 40px;
    h1 {
      color: white;
      font-size: 40px;
    }
    h2 {
      font-size: 20px;
      color: white;
      margin: 20px 0px;
    }
    .login_btn {
      width: 100%;
    }
  }
}
</style>
