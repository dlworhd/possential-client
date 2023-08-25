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
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid white;
}

.navItem {
    color: white;
    list-style: none;
    margin-right: 20px;
}

.navItem:hover {
    transform: scale(1.1);
}
</style>