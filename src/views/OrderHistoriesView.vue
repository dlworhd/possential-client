<template>
    <div>
         <OrderHistory/>       
    </div>  
</template>

<script>
import OrderHistory from '@/components/order/OrderHistory.vue';
import { defineComponent } from 'vue';


export default defineComponent({
    components: {
    OrderHistory
}
})

</script>