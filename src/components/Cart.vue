<template>
    <div>
        
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import NewMenuComponent from './NewMenuComponent.vue';



export default defineComponent({
  
  data(){
    return{
        cartList: [
            
        ]
    }
  },
  computed: {
    cartItems() {
      return this.$state
    }
  }
})


</script>




<style>
</style>