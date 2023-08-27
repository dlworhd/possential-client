<template>
  <OrderOption />
  <div class="order-cart-container">
    <div class="order-cart-item" v-for="menu in cartItems" :key="menu.menuId">
      <OrderDetail :menu="menu"/>
      <OrderQuantityButton :menu="menu" />
    </div>
  </div>
  <OrderTotalPrice :totalPrice="getTotalPrice"/>
  <OrderButton @click="openModal"/>
  <PaymentTypeModal :visible="isModalVisible" @noVisible="closeModal"/>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Menu } from "../../../store/index";
import OrderTotalPrice from "./OrderTotalPrice.vue";
import OrderButton from "./OrderButton.vue";
import OrderOption from "./OrderOption.vue";
import OrderQuantityButton from "./OrderQuantityButton.vue";
import OrderDetail from "./OrderDetail.vue";
import PaymentTypeModal from "./PaymentTypeModal.vue";


export default defineComponent({
  data() {
    return {
      cartList: [],
      isModalVisible: false,
    };
  },
  methods: {
    closeModal() {
      this.isModalVisible = false;
    },
    openModal() {
      this.isModalVisible = true;
    },
  },
  components: {
    OrderOption,
    OrderTotalPrice,
    OrderButton,
    OrderQuantityButton,
    OrderDetail,
    PaymentTypeModal
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
  height: 75vh;
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
