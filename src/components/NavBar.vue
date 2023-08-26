<template>

<div class="outer-container">
    <div class="nav-container">
    <li class="navItem" v-for="item in navItems" :key="item.id" >
        <router-link :to="item.path">
            {{ item.name }}
        </router-link>
    </li>
    </div>
    <div v-if="getIsLogin" class="login-container btn">
        <router-link to="/login">
        <div>
            로그인
        </div>
        </router-link>
    </div>
    <div v-if="!getIsLogin" @click="logout" class="login-container btn">
        <div class="btn">
            로그아웃
        </div>
    </div>
</div>   

</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { RouterLink } from 'vue-router';
import { mapGetters, mapMutations } from 'vuex';
export default defineComponent({
    data(){
        return {
            navItems: [
            {
                id: 1,
                name: '홈',
                path: '/'
            },
            {
                id: 2,
                name: '포스',
                path: '/pos'
            },
            {
                id: 3,
                name: '주문 내역',
                path: '/orders'
            }, 
            ],
            isLogin: false
        }
    },
    computed: {
        ...mapGetters(['getIsLogin'])
    },
    methods: {
        ...mapMutations(['setLogin']),
        logout(){
            document.cookie = "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
            this.setLogin(false)
            this.$router.push('/login')
        }
    }
    
})
</script>

<style lang="scss" scoped>
@import '../assets/variable.scss';
a {
    color: white;
    text-decoration: none;
}

.outer-container {
    height: 10vh;
    position: fixed;
    top: 0;
    margin-bottom: 10vh;
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
    flex-grow: 9.5;
    flex-basis: 0;
    display: flex;
    justify-content: center;
}

.login-container {
    flex-grow: 0.5;
    flex-basis: 0;
    display: flex;
    align-items: center;
    color: white;
}


</style>