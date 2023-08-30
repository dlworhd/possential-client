<template>
    <div class="home-board-container">
            <MenuBoard />
            <OrderBoard />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import OrderBoard from '../order/OrderBoard.vue';
import { Store } from 'vuex';
import MenuBoard from '../menu/MenuBoard.vue';


declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: Store<any>;
  }
}

export enum OrderByType {
    LATEST = 'LATEST',
    OLDEST = 'OLDEST'
}

export default defineComponent({

components: {
    MenuBoard,
    OrderBoard,
}
})

</script>

<style lang="scss" scoped>
@import '../../../assets/variable';
.home-board-container {
    display: flex;
    height: auto;
}

</style>