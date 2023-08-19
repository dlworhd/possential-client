<template>
    <div>
        <NewMenuComponentVue/>
        <Cart/>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import NewMenuComponentVue from './NewMenuComponent.vue';

export default defineComponent({


components: {
    NewMenuComponentVue
}
})




</script>

<style scoped>

</style>