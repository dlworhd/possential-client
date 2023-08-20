<template>
    <div class="cartItem" v-for="menu in cartItems" :key="menu.menuId">
        {{ menu.menuName }}
        {{ menu.totalPrice }}
        {{ menu.quantity }}
        <button @click="increaseQuantity(menu)"> + </button>
        <button @click="decreaseQuantity(menu)"> - </button>
    </div>
    <div> totalPrice = {{ totalPrice }}</div>
    
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Store } from 'vuex';
import { Menu } from './MenuItem.vue'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: Store<any>;
  }
}
export default defineComponent({
  
  data(){
    return{
        cartList: [
            
        ]
    }
  },
  computed: {
    cartItems(): Menu[] {
      return this.$store.getters.getCartItems
    },
    totalPrice(){
      return this.$store.getters.getTotalPrice
    }
  },
  methods: {
    increaseQuantity(menu: Menu) {
      this.$store.dispatch('increaseQuantityAction', menu)
    },
    decreaseQuantity(menu: Menu) {
      this.$store.dispatch('decreaseQuantityAction', menu)
    }
  }
})


</script>

<style>
</style>