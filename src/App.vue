<script lang="ts">
import { RouterView } from 'vue-router'
import { defineComponent } from 'vue';
import NavBar from './components/common/NavBar.vue';


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
    <RouterView/>
  </div>
</template>

<style lang="scss">
@import './assets/main.scss';

body {
  background-color: $main--background-color;
  margin: 0;
}


#app {
  margin: 0;
  // border: 1px solid white;
  height: 90vh;
  // overflow: hidden;
}

.btn {
  cursor: pointer;
}

* {
  box-sizing: border-box;
}



</style>