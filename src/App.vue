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
    }
})

</script>

<template>
  <div id="app">
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