import { defineComponent } from 'vue';
import { mapState } from 'vuex';
<template>
    <div  v-if="isLogin" class="order-button-container">
        <div class="order-btn">
            주문/결제
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapState } from 'vuex';


export default defineComponent({
computed: {
    ...mapState(['isLogin'])
}

})



</script>

<style lang="scss" scoped>
@import '../../../assets/variable.scss';
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