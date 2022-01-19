<template>
  <div class="phone-login">手机登录</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const loginAction = () => {
      console.log('手机号正在登录中...')
    }
    return {
      loginAction
    }
  }
})
</script>

<style scoped></style>
