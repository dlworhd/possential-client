<template>
    <div class="container">
        <MenuItem/>
        <div>
            <MenuCart />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MenuItem from './menu/MenuItem.vue';
import MenuCart from './menu/MenuCart.vue';

export default defineComponent({


components: {
    MenuItem,
    MenuCart
}
})

</script>

<style scoped>
.container {
    display: flex;
}
</style>