<template>
  <div class="nav-bar__outer-container">
    <img class="nav-bar__logo" src="../../assets/logo.png" @click="handleLogo" />
    <div class="nav-bar__inner-container">
      <ul class="nav-bar__item-group">
        <li v-if="!isLogin" class="nav-bar__item">
          <RouterLink to="/sign-up" class="btn">회원가입</RouterLink>
        </li>
        <li v-if="!isLogin" class="nav-bar__item">
          <RouterLink to="/login" class="btn">로그인</RouterLink>
        </li>
        <li v-if="isLogin" class="nav-bar__item">
          <RouterLink to="/orders" class="btn">주문 내역</RouterLink>
        </li>
        <li v-if="isLogin" class="nav-bar__item">
          <RouterLink to="/payments" class="btn">결제 내역</RouterLink>
        </li>
        <li v-if="isLogin" class="nav-bar__item">
          <span @click="logout" class="btn">로그아웃</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import instance from "@/plugin/CustomAxios";
import { defineComponent } from "vue";
import { mapMutations, mapState } from "vuex";

export default defineComponent({
  data() {
    return {
      navItems: [
        {
          id: 1,
          name: "주문 내역",
          path: "/orders",
        },
        {
          id: 2,
          name: "결제 내역",
          path: "/payments",
        },
      ],
    };
  },
  computed: {
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

        await instance
          .post('/api/auth/logout', requestEmail)
          .then((response) => {
            if (response.status === 200) {
              localStorage.removeItem('accessToken');
              this.RESET_STATE();
              this.$router.go(-1);
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

.nav-bar__outer-container {
  position: fixed;
  top: 0;
  // left: 50%;
  width: 100vw;
  // width: 100vw;
  align-items: center;
  // padding: 10px 0;
  height: 5vh;
  display: flex;
  justify-content: center;
  border-bottom: 1px solid rgba(142, 117, 117, 0.652);
  background-color: rgba(1, 0, 86, 0.847);
}

.nav-bar__inner-container {
  position: absolute;
  right: 1vw;
}

.nav-bar__item-group {
  display: flex;
  justify-content: center;
  margin: 0;
  // padding: 10px 0;
}

.nav-bar__logo {
  height: 60%;
  max-height:5vh; 
  cursor: pointer;
}

.nav-bar__logo:hover {
  transform: scale(1.1);
  transition-duration: 300ms;
}

.btn {
  color: white;
  background: none;
  text-decoration: none;
}

.nav-bar__item{
  margin-left: 20px;
  color: white;
  text-decoration: none;
  list-style: none;
}

.nav-bar__item:hover {
  transform: scale(1.1);
  transition-duration: 300ms;
}
</style>
