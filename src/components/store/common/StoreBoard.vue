<template>
    <NavBar/>
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
import { Store } from 'vuex';
import MenuGrid from '../menu/MenuGrid.vue';
import NavBar from '@/components/NavBar.vue';


declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: Store<any>;
  }
}

export default defineComponent({

components: {
    MenuGrid,
    OrderCart,
    NavBar
}
})

</script>

<style lang="scss" scoped>
@import '../../../assets/variable';
.pos-container {
    margin-top: 10vh;
    display: flex;
    height: 90vh;
    margin-bottom: 10vh;
    justify-content: space-between;

}

.menu-board {
    width: 75vw;
    height: 90vh;
    border-left: 1px solid white;
    border-bottom: 1px solid white;
    box-sizing: border-box;
}

.order-board {
    width: 30vw;
    height: 90vh;

    border-left: 1px solid white;
    border-right: 1px solid white;
    // height: 100vh;
    background-color: $main--background-color;
    // overflow-y: hidden;
}
</style>