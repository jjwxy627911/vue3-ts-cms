<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>
    <el-tabs type="border-card" stretch v-model="currentTab">
      <el-tab-pane name="account">
        <template #label>
          <span>
            <el-icon><user /></el-icon> 账号登录
          </span>
        </template>
        <account-login ref="accountRef"></account-login>
      </el-tab-pane>
      <el-tab-pane name="phone">
        <template #label>
          <span>
            <el-icon><cellphone /></el-icon> 手机登录
          </span>
        </template>
        <phone-login ref="phoneRef"></phone-login>
      </el-tab-pane>
    </el-tabs>
    <div class="login-control">
      <el-checkbox v-model="remenberPassword">记住密码</el-checkbox>
      <el-link type="primary">忘记密码</el-link>
    </div>
    <el-button type="primary" class="login-btn" @click="handleLoginClick"
      >立即登录</el-button
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import AccountLogin from './AccountLogin.vue'
import PhoneLogin from './PhoneLogin.vue'

export default defineComponent({
  components: {
    AccountLogin,
    PhoneLogin
  },
  setup() {
    // 记住密码
    const remenberPassword = ref(true)
    // 当前显示的tab
    const currentTab = ref('account')
    // 账号登录组件
    const accountRef = ref<InstanceType<typeof AccountLogin>>()

    // 手机登录组件
    const phoneRef = ref<InstanceType<typeof PhoneLogin>>()

    // 处理登录逻辑
    const handleLoginClick = () => {
      if (currentTab.value === 'account') {
        console.log('处理账号密码登录')
        accountRef.value?.loginAction(remenberPassword.value)
      } else {
        console.log('处理手机号登录')
        phoneRef.value?.loginAction()
      }
    }
    return {
      remenberPassword,
      handleLoginClick,
      currentTab,
      accountRef,
      phoneRef
    }
  }
})
</script>

<style scoped lang="less">
.login-panel {
  margin-bottom: 150px;
  width: 320px;

  .title {
    text-align: center;
  }

  .login-control {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
  }

  .login-btn {
    width: 100%;
    margin-top: 10px;
  }
}
</style>
