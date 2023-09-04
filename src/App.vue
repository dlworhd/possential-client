<template>
  <div id="app">
    <NavBar/>
    <RouterView/>
  </div>
</template>

<script lang='ts'>
import { RouterView } from 'vue-router'
import { defineComponent } from 'vue';
import NavBar from './components/common/NavBar.vue';

export default defineComponent({
    data() {
        return {
            style: {
                backgroundColor: 'black'
            }
        };
    }, 
    components: {
      RouterView,
      NavBar
    }
})

</script>

<style lang='scss'>
@import './assets/main.scss';

body {
  background-color: $main--background-color;
  margin: 0;
}

*::-webkit-scrollbar {
  display: none;
  
}

.btn {
  cursor: pointer;
}

html {
  overflow-y: scroll;
}

*{
  box-sizing: border-box;
}

.view {
  margin-top: 5vh;
}

</style>