<script lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { defineComponent } from 'vue';
import StoreBoard from './components/StoreBoard.vue';

export default defineComponent({
    data() {
        return {
            style: {
                backgroundColor: "black"
            }
        };
    },
    components: { StoreBoard }
})

</script>

<template>
  <div id="app">
    <RouterView />
    <StoreBoard />
  </div>
</template>

<style lang="scss">
@import './assets/main.scss';

body {
  background-color: $main-color;
}

</style>
