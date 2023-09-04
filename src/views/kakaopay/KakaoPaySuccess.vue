<template>


    <div class="pay-success">
        <div class="pay-success__message">🎉🎉🎉결제 완료🎉🎉🎉</div>
        <img class="pay-success__image" src="../../assets/kakaopay.png">
    </div>


    
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({

})
</script>

<style lang="scss" scoped>

.pay-success {
    margin-top: 10vh;
}
.pay-success__image {
    display: block;
    width: 300px;
    margin: 0 auto;
}


.pay-success__message {
    color: white;    
    margin: 0 auto 2vh auto;
    width: 200px;
    text-align: center;
}
</style>