<template>
    <div>
        <MenuItem/>
        <MenuCart />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MenuItem from './MenuItem.vue';
import MenuCart from './MenuCart.vue';

export default defineComponent({


components: {
    MenuItem,
    MenuCart
}
})




</script>

<style scoped>

</style>