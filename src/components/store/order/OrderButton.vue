import { defineComponent } from 'vue';
<template>
    <div class="order-button-container" @click="orderReqeust">
        <div class="order-btn">
            주문/결제
        </div>
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

<style scoped>

.order-button-container {
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid white;
    height: 10vh;
    cursor: pointer;
    /* overflow-y: hidden; */
}
.order-btn{
    background: none;
    color: white;
}

</style>