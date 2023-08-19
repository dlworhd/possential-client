<template>
    <div class="cartItem" v-for="menu in cartItems" :key="menu.menuId">
        {{ menu.menuName }}
        {{ menu.price }}
        {{ menu.quantity }}
        <button @click="increaseQuantity(menu)"> + </button>
        <button @click="decreaseQuantity(menu)"> - </button>
    </div>
    
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
    cartItems() {
      return this.$store.getters.getCartItems
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