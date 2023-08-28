<template>
    <OrderModalComponent v-if="visible" :visible="visible" @execute="execute" @cancel="cancel">
        <div class="modal" v-if="visible">
            <div class="modal-container">
                <div class="option cash-btn" @click="execute('CASH')">현금</div>
                <div class="option kakaopay-btn" @click="execute('KAKAOPAY')">카카오페이</div>
            </div>
        </div>
    </OrderModalComponent>
</template>

<script lang="ts">
import OrderModalComponent from '@/components/common/OrderModalComponent.vue';
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        visible: Boolean
    },
    data(){
        return {
            orderType: '현금',
            isVisible: false
        }
    },
    components: {
        OrderModalComponent
    },
    methods: {
        cancel(){
            this.$emit('noVisible')
        },
        execute(option: string){

            if(option === 'KAKAOPAY' && this.$store.state.totalPrice <= 0){
                alert('결제 금액은 최소 1원 이상이어야 합니다.')
            } else {
                this.$store.commit('setPaymentType', option);
                this.$store.dispatch('sendOrder');
                this.isVisible = false
                this.$emit('noVisible')
            }
        }

    }
})
</script>

<style lang="scss" scoped>
@import '../../../assets/variable.scss';

.option {
    color: white;
    border: 1px solid $main--color;
    text-align: center;
    margin-bottom: 10px;
    padding: 10px;
    cursor: pointer;
}

.modal-container {
    display: flex;
}

.cash-btn{
    color: white;
    margin-right: 5px;
}

.cash-btn:hover{
    color: black;
    background-color: $main--color;
}


.kakaopay-btn{
    color: yellow;
    margin-left: 5px;
    border: 1px solid yellow;
}

.kakaopay-btn:hover{
    color: black;
    border: 1px solid yellow;
    background-color: yellow;
}



</style>