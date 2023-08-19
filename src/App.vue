<script lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { defineComponent } from 'vue';
import MenuBoard from './components/MenuBoard.vue';

export default defineComponent({
    data() {
        return {
            style: {
                backgroundColor: "black"
            }
        };
    },
    components: { MenuBoard }
})

</script>

<template>
  <div id="app">
    <RouterView />
    <MenuBoard />
  </div>
</template>

<style lang="scss">
@import './assets/main.scss';

body {
  background-color: $main-color;
}

</style>
