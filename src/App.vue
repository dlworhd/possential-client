<script lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { defineComponent } from 'vue';
import NewMenuComponentVue from './components/NewMenuComponent.vue';

export default defineComponent({
    data() {
        return {
            style: {
                backgroundColor: "black"
            }
        };
    },
    components: { NewMenuComponentVue }
})

</script>

<template>
  <div id="app">
    <RouterView />
    <NewMenuComponentVue />
  </div>
</template>

<style lang="scss">
@import './assets/main.scss';

body {
  background-color: $main-color;
}

</style>
