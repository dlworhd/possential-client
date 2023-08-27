<template>
    
    <div class="message">
        <img class="kakaopay-logo" src="../assets/kakaopay.png">
        <span>결제가 완료되었습니다.</span>
    </div>
    
</template>

<script lang="ts">
import { defineComponent } from 'vue';


export default defineComponent({

})
</script>

<style lang="scss" scoped>

.message {
    position: fixed;
    top: 40vh;
    width: 100%;
    color: yellow;
    text-align: center;
}

</style>