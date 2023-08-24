<script lang="ts">
import { RouterView } from 'vue-router'
import { defineComponent } from 'vue';


export default defineComponent({
    data() {
        return {
            style: {
                backgroundColor: "black"
            }
        };
    }, 
    components: {
      RouterView
    }
})

</script>

<template>
  <div id="app">
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
  border: 1px solid white;
  // overflow-y: hidden;
  box-sizing: border-box;
  overflow-y: hidden;
  height: 100vh;
}

</style>
