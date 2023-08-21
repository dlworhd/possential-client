<script lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { defineComponent } from 'vue';
// import SignUpView from './views/SignUpView.vue';


export default defineComponent({
    data() {
        return {
            style: {
                backgroundColor: "black"
            }
        };
    },
    components: {
      // SignUpView
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
}

</style>
