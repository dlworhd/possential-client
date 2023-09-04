<template>


    <div class="pay-failure">
        <div class="pay-failur__message">☠️☠️☠️결제 실패☠️☠️☠️</div>
        <img class="pay-failure__image" src="../../assets/kakaopay.png">
    </div>


    
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({

})
</script>

<style lang="scss" scoped>

.pay-failure {
    margin-top: 10vh;
}
.pay-failure__image {
    display: block;
    width: 300px;
    margin: 0 auto;
}


.pay-failur__message {
    color: white;    
    margin: 0 auto 2vh auto;
    width: 200px;
    text-align: center;
}
</style>