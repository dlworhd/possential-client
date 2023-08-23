<template>

<div class="container">

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

.container {
    max-width: 1440px;
    display: flex;
    justify-content: center;
}

.navItem {
    color: white;
    list-style: none;
    margin-right: 20px;
}
</style>