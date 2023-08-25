<template lang="">
    <div class="order-detail-container">
        <div class="menu-name">
          {{ menu.menuName }}
        </div>
        <div class="menu-quantity">
          {{ menu.quantity }}개
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Menu } from '../../../store/index';


export default defineComponent({
    props: {
        menu: {
            type: Object as () => Menu,
            required: true
        }
    }
})
</script>

<style scoped>

.order-detail-container {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 0 10px;
}

.menu-name {

    flex-grow: 9;
    flex-basis: 0;
}

.menu-quantity {
    flex-grow: 2;
    flex-basis: 0;
    text-align: end;

}
</style>