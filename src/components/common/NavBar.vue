<template>
  <div class="outer-container">
    <div class="nav-container">
      <li class="navItem" v-for="item in navItems" :key="item.id">
        <RouterLink :to="item.path">
          {{ item.name }}
        </RouterLink>
      </li>
    </div>
    <LoginComponent class="login-container" @logout="logout"/>
  </div>
</template>

<script lang="ts">
import instance from "@/plugin/CustomAxios";
import { defineComponent } from "vue";
import { RouterLink } from "vue-router";
import { mapGetters, mapMutations, mapState } from 'vuex';
import LoginComponent from "./LoginComponent.vue";

export default defineComponent({
  data() {
    return {
      navItems: [
        {
          id: 1,
          name: "홈",
          path: "/",
        },
        {
          id: 2,
          name: "포스",
          path: "/pos",
        },
        {
          id: 3,
          name: "주문 내역",
          path: "/orders",
        },
      ],
      isLogin: false,
    };
  },
  computed: {
    ...mapGetters(["getIsLogin"]),
    ...mapState(['email'])
  },
  components: {
    LoginComponent
  },
  methods: {
    ...mapMutations(['RESET_STATE']),

    async logout() {
      try {
        const requestEmail = {
            email: this.email
        }
        document.cookie =
        "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        await instance
          .post("/api/auth/logout", requestEmail)
          .then((response) => {
            if (response.status === 200) {
                localStorage.removeItem("accessToken")
                this.RESET_STATE()
                this.$router.push('/')
            }
        });

      } catch (error) {
        console.log(error);
        this.$router.go(-1)
      }
    },
  },
});
</script>

<style lang="scss" scoped>
@import '../../assets/variable.scss';

a {
    color: white;
    text-decoration: none;
}

.outer-container {
    height: 10vh;
    position: fixed;
    top: 0;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid white;
    background-color: $main--background-color;
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
</style>
