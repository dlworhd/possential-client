<template>
<div class="login-container">
  <ul class="nav-container">
    <li v-if="!isLogin" class="item"><RouterLink to="/sign-up" class="btn">회원가입</RouterLink></li>
    <li v-if="!isLogin" class="item"><RouterLink to="/login" class="btn">로그인</RouterLink></li>
    <li v-if="isLogin" class="item"><RouterLink to="/pos" class="btn">포스</RouterLink></li>
    <li v-if="isLogin" class="item"><RouterLink to="/orders" class="btn">주문 내역</RouterLink></li>
    <li v-if="isLogin" class="item"><span @click="handleLogout" class="btn">로그아웃</span></li>
  </ul>
</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapState } from "vuex";

export default defineComponent({
  computed: {
    ...mapState(["isLogin"]),
  },
  methods: {
    handleLogout() {
      this.$emit("logout");
    },
  },
});
</script>

<style lang="scss" scoped>


</style>
