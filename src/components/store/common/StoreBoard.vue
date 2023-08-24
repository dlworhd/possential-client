<template>

    <div class="pos-container">
        <!-- 왼쪽 메뉴 선택 보드 -->
        <div class="menu-board">
            <MenuGrid/>
        </div>
        
        <!-- 오른쪽 주문 내역 3단(옵션, 메뉴, 결제/주문 버튼) 보드-->
        <div class="order-board">
            <OrderOption />
            <OrderCart />
            <OrderButton />
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
    OrderOption,
    OrderButton
}
})

</script>

<style lang="scss">
@import '../../../assets/variable';
.pos-container {
    /* height: 100%; */
    display: flex;
    width: 75vw;
    box-sizing: border-box;
    /* justify-content: center; */
}

.menu-board {
    width: 75vw;
}

.order-board {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    width: 25vw;
    border: 1px solid white;
    // height: 100vh;
    background-color: $main-color;
}
</style>