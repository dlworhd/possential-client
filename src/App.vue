<script lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { defineComponent } from 'vue';
import NavBar from './components/NavBar.vue';

export default defineComponent({
    data() {
        return {
            style: {
                backgroundColor: "black"
            }
        };
    }, 
    components: {
      NavBar
    }
})

</script>

<template>
  <div id="app">
    <NavBar />
    <RouterView />
  </div>
</template>

<style lang="scss">
@import './assets/main.scss';

body {
  background-color: $main-color;
}

html {
  max-width: 1;
}

</style>
