<template>
<div class="order-board">
  <OrderOption />
  <OrderCart />
  <OrderTotalPrice />
  <OrderButton/>
</div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import OrderTotalPrice from './OrderTotalPrice.vue';
import OrderButton from './OrderButton.vue';
import OrderOption from './OrderOption.vue';
import OrderCart from './OrderCart.vue';

export default defineComponent({
  data() {
    return {
      cartList: [],
    };
  },
  methods: {},
  components: {
    OrderOption,
    OrderCart,
    OrderTotalPrice,
    OrderButton,
},
});
</script>

<style lang='scss' scoped>
@import '../../../assets/variable.scss';

.menu-name {
  position: relative;
}

.order-board {
    width: 30vw;
    border-left: 0.5px solid white;
    border-right: 0.5px solid white;
    background-color: $main--background-color;
}

</style>
