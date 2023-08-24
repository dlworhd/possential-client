import { defineComponent } from 'vue';
<template>
    <div class="order-button-container">
        <button class="order-btn" @click="orderReqeust">
            주문/결제
        </button>
    </div>
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

.order-button-container {
    width: inherit;
}
.order-btn{
    position: absolute;
    bottom: 0;
    background: none;
    border: 1px white solid;
    /* padding: 30px; */
    width: inherit;
    color: white;
    height: 10vh;
}
</style>