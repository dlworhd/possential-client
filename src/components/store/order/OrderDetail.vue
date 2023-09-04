<template>
    <div class="order-detail-container">
        <div class="menu-name">
          {{ menu.menuName }}
        </div>
        <div class="menu-quantity">
          {{ menu.quantity }}개
        </div>
    </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import { Menu } from '../menu/MenuBoard.vue';


export default defineComponent({
    props: {
        menu: {
            type: Object as () => Menu,
            required: true
        }
    }
})
</script>