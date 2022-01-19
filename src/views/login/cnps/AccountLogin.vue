<template>
  <div class="account-login">
    <el-form label-width="60px" :rules="rules" :model="account" ref="formRef">
      <el-form-item label="账号" prop="username">
        <el-input v-model="account.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" show-password></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { ElForm } from 'element-plus'
import { rules } from '../config/account-config'
export default defineComponent({
  setup() {
    const account = reactive({
      username: '',
      password: ''
    })

    const formRef = ref<InstanceType<typeof ElForm>>()

    const loginAction = (remenberPassword: boolean) => {
      console.log('账号密码正在登录中...')
      // 判断表单校验是否通过
      formRef.value?.validate((valid) => {
        // 校验通过
        if (valid) {
          // 是否记住密码
          if (remenberPassword) {
            // 设置本地缓存
          } else {
            // 清除本地缓存
          }
          // 进行登录校验
        }
      })
    }
    return {
      rules,
      account,
      loginAction,
      formRef
    }
  }
})
</script>

<style scoped></style>
