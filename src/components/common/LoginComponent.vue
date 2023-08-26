<template>
<div class="login-container">
  <ul>
    <li v-if="!isLogin"><RouterLink to="/login" class="btn">로그인</RouterLink></li>
    <li v-if="isLogin"><span @click="handleLogout" class="btn">로그아웃</span></li>
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

.login-container {
    position: absolute;
    right: 5vw;
}

.btn {
    color: white;
    background: none;
    text-decoration: none;
}

li {
    list-style: none;
}
</style>
