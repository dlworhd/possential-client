<template>
  <OrderOption />
  <div class="order-cart-container">
    <div class="order-cart-item" v-for="menu in cartItems" :key="menu.menuId">
      <OrderDetail :menu="menu"/>
      <OrderQuantityButton :menu="menu" />
    </div>
  </div>
  <OrderTotalPrice :totalPrice="getTotalPrice"/>
  <OrderButton/>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Menu } from "../../../store/index";
import OrderTotalPrice from "./OrderTotalPrice.vue";
import OrderButton from "./OrderButton.vue";
import OrderOption from "./OrderOption.vue";
import OrderQuantityButton from "./OrderQuantityButton.vue";
import OrderDetail from "./OrderDetail.vue";
export default defineComponent({
  data() {
    return {
      cartList: [],
    };
  },
  methods: {

  },
  components: {
    OrderOption,
    OrderTotalPrice,
    OrderButton,
    OrderQuantityButton,
    OrderDetail

},
  computed: {
    cartItems(): Menu[] {
      return this.$store.getters.getCartItems;
    },
    getTotalPrice() {
      return this.$store.getters.getTotalPrice;
    },
  },
  
});
</script>

<style scoped>

.order-cart-container {
  overflow-y: scroll;
  overflow-x: hidden;
  height: 70vh;
  border-bottom: 1px solid white;
}
.order-cart-item {
  display: flex;
  color: white;
  border: 1px solid white;
  justify-content: space-between;
}

.menu-name {
  position: relative;
  /* left: 10px; */
}

</style>
