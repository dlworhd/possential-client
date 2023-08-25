<template>

    <div class="pos-container">
        <!-- 왼쪽 메뉴 선택 보드 -->
        <div class="menu-board">
            <MenuGrid/>
        </div>
        
        <!-- 오른쪽 주문 내역 3단(옵션, 메뉴, 결제/주문 버튼) 보드-->
        <div class="order-board">
            <OrderCart />
        </div>

    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import OrderCart from '../order/OrderCart.vue';
import OrderOption from '../order/OrderOption.vue'
import { Store } from 'vuex';
import OrderButton from '../order/OrderButton.vue';
import MenuGrid from '../menu/MenuGrid.vue';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: Store<any>;
  }
}

export default defineComponent({

components: {
    MenuGrid,
    OrderCart,
}
})

</script>

<style lang="scss" scoped>
@import '../../../assets/variable';
.pos-container {
    /* height: 100%; */
    display: flex;
    justify-content: space-between;
}

.menu-board {
    width: 75vw;
    border-left: 1px solid white;
    border-bottom: 1px solid white;
    box-sizing: border-box;
}

.order-board {
    width: 30vw;
    border-left: 1px solid white;
    border-right: 1px solid white;
    height: 90vh;
    background-color: $main-color;
    // overflow-y: hidden;
}
</style>