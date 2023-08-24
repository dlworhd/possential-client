<template>
  <div class="order-cart-container">
    <div class="order-cart-item" v-for="menu in cartItems" :key="menu.menuId">
      <div class="order-detail">
        <div class="menu-name">
          {{ menu.menuName }}
        </div>
        <div class="menu-quantity">
          {{ menu.quantity }}개
        </div>
      </div>
      <div class="btn-container">
        <div>
            <div>
              <button class="increase-btn btn" @click="increaseQuantity(menu)">
                +
              </button>
            </div>
            <div>
              <button class="decrease-btn btn" @click="decreaseQuantity(menu)">
                -
              </button>
            </div>
        </div>
      </div>
    </div>

    <div class="total-price">
      <div>
        총액 =
        {{ totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}원
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Menu } from "../../../store/index";
export default defineComponent({
  data() {
    return {
      cartList: [],
    };
  },
  components: {},
  computed: {
    cartItems(): Menu[] {
      return this.$store.getters.getCartItems;
    },
    totalPrice() {
      return this.$store.getters.getTotalPrice;
    },
  },
  methods: {
    increaseQuantity(menu: Menu) {
      this.$store.dispatch("increaseQuantityAction", menu);
    },
    decreaseQuantity(menu: Menu) {
      this.$store.dispatch("decreaseQuantityAction", menu);
    },
  },
});
</script>

<style>
.btn-container {
  flex-grow: 0;
  flex-basis: 0;
}
.order-cart-container {
  width: inherit;
  /* position: relative; */
  overflow-y: scroll;
  overflow-x: visible;
  height: 82vh;
}

.order-cart-item {
  display: flex;
  color: white;
  border: 1px solid white;
  justify-content: space-between;
}

.total-price {
  color: white;
  position: fixed;
  /* right: 0; */
  bottom: 10vh;
  right: 0;
  width: 25vw;
  border: 1px solid white;
  height: 5vh;
  display: flex;
  /* padding: 10px; */
  /* text-align: center; */
}

.btn {
  width: 5vw;

  background: none;
  color: white;
  border: 1px solid rgb(108, 183, 68);
  /* border-radius: 15px; */
}

.increase-btn {
  flex-grow: 1;
  flex-basis: 0;
}

.decrease-btn {
  flex-grow: 1;
  flex-basis: 0;
}

.order-detail{
  display: flex;
  /* justify-content: space-; */
  flex-grow: 4;
  flex-basis: 0;
  align-items: center;
  padding: 10px;
}

.menu-name {
  position: relative;
  /* left: 10px; */
}

</style>
