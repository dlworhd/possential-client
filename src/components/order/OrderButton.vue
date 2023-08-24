import { defineComponent } from 'vue';
<template>
    <button class="order-btn" @click="orderReqeust">
        주문/결제
    </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({

    computed: {
        cartItems(){
            return this.$store.getters.getCartItems;
        }
    },
    methods: {
        orderReqeust() {
            this.$store.dispatch('sendOrder')
        }
    }

})

</script>

<style>
.order-btn{
    background-color: #fff;
}
</style>