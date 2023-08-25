<template>
    <div class="total-price">
        총액 = {{ getTotalPrice }}
        
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        totalPrice: Number 
    },
    computed: {
        getTotalPrice(){
            if(this.totalPrice != null){
                return `${this.totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
            } else {
                return '--------'
            }
        }
    }
})


</script>

<style scoped>

.total-price {
  color: white;
  border-bottom: 1px solid white;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 5vh;
}
</style>