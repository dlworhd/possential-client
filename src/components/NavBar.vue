<template>

<div class="nav-container">
    <li class="navItem" v-for="item in navItems" :key="item.id" >
        <router-link :to="item.path">
            {{ item.name }}
        </router-link>
    </li>
</div>   

</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { RouterLink } from 'vue-router';
export default defineComponent({
    data(){
        return {
            navItems: [
            {
                id: 1,
                name: 'Home',
                path: '/'
            },
            {
                id: 2,
                name: 'Pos',
                path: '/pos'
            }, 
            {
                id: 3,
                name: 'Login',
                path: '/login'
            },
            ]
        }
    }

})
</script>

<style scoped>

a {
    color: white;
    text-decoration: none;
}

.nav-container {
    margin: 25px 0;
    box-sizing: border-box;
    width: 75vw;
    display: flex;
    justify-content: center;
}

.navItem {
    color: white;
    list-style: none;
    margin-right: 20px;
}
</style>