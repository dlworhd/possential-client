<template>

  <div class="outer-container">
    <img class="logo" src="../../assets/logo.png" @click="handleLogo" />
    <div class="login-container">
      <ul class="nav-container">
        <li v-if="!isLogin" class="item">
          <RouterLink to="/sign-up" class="btn">회원가입</RouterLink>
        </li>
        <li v-if="!isLogin" class="item">
          <RouterLink to="/login" class="btn">로그인</RouterLink>
        </li>
        <li v-if="isLogin" class="item">
          <RouterLink to="/pos" class="btn">포스</RouterLink>
        </li>
        <li v-if="isLogin" class="item">
          <RouterLink to="/orders" class="btn">주문 내역</RouterLink>
        </li>
        <li v-if="isLogin" class="item">
          <span @click="logout" class="btn">로그아웃</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import instance from "@/plugin/CustomAxios";
import { defineComponent } from "vue";
import { mapGetters, mapMutations, mapState } from "vuex";

export default defineComponent({
  data() {
    return {
      navItems: [
        {
          id: 1,
          name: "포스",
          path: "/pos",
        },
        {
          id: 2,
          name: "주문 내역",
          path: "/orders",
        },
      ],
    };
  },
  computed: {
    ...mapGetters(['getIsLogin']),
    ...mapState(['email', 'isLogin']),
  },
  components: {
  },
  methods: {
    ...mapMutations(['RESET_STATE']),
    handleLogo() {
      this.$router.push('/');
    },
    async logout() {
      try {
        const requestEmail = {
          email: this.email,
        };
        document.cookie =
          'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        await instance
          .post('/api/auth/logout', requestEmail)
          .then((response) => {
            if (response.status === 200) {
              localStorage.removeItem('accessToken');
              this.RESET_STATE();
              this.$router.push('/');
            }
          });
      } catch (error) {
        console.log(error);
        this.$router.go(-1);
      }
    },
  },
});
</script>

<style lang="scss" scoped>
@import "../../assets/variable.scss";

a {
  color: white;
  text-decoration: none;
}

.outer-container {
  height: 5vh;
  position: fixed;
  top: 0;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid rgba(249, 249, 249, 0.652);
  background-color: rgba(65, 65, 65, 0.313);
}

.navItem {
  color: white;
  list-style: none;
  margin-right: 20px;
}

.navItem:hover {
  transform: scale(1.1);
}

.nav-container {
  flex-grow: 9.2;
  flex-basis: 0;
  display: flex;
  justify-content: center;
}

.login-container {
  flex-grow: 0.8;
  flex-basis: 0;
}

.logo {
  height: 3vh;
  cursor: pointer;
}

.logo:hover {
  transform: scale(1.1);
  transition-duration: 300ms;
}

// 

.nav-container {
    display: flex;
}

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

.item{
    margin-right: 20px;
}

.item:hover {
    transform: scale(1.1);
  transition-duration: 300ms;
}
</style>
