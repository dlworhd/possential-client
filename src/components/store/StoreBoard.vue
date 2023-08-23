<template>

    <div class="container">

        <MenuItem/>
        <div>
            <InAndOut />
            <MenuCart />
            <OrderButton /> 
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MenuItem from './menu/MenuItem.vue';
import MenuCart from './menu/MenuCart.vue';
import OrderButton from '../order/OrderButton.vue'
import InAndOut from '../order/InAndOut.vue'

export default defineComponent({


components: {
    MenuItem,
    MenuCart,
    OrderButton,
    InAndOut
}
})

</script>

<style scoped>
/* .container {
    display: flex;
    margin: 0;
} */
</style>