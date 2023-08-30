import { defineComponent } from 'vue';
<template>
    <PaymentBoard/>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import PaymentBoard from '../components/payment/PaymentBoard.vue'

export default defineComponent({

    components: {
        PaymentBoard
    }
})

</script>