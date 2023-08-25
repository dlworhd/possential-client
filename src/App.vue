<script lang="ts">
import { RouterView } from 'vue-router'
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
      RouterView,
      NavBar
    }
})

</script>

<template>
  <div id="app">
    <NavBar/>
    <RouterView />
  </div>
</template>

<style lang="scss">
@import './assets/main.scss';

body {
  background-color: $main-color;
  margin: 0;
}

html {
  margin: 0;
  // border: 1px solid white;
  height: 100vh;
  overflow: hidden;
}

* {
  box-sizing: border-box;
}




</style>
