<template>
    <div class="calendar">
        <div @click="setCurrentPage(i)" :class="{ 'selected': i === currentPage }" class="calendar__month btn" v-for="i in 12" :key="i">{{ i }}월</div>
    </div>
    <div class="payment-board">
        <div class="payment_board__title-container title">
            <div class="payment_board__item-index title">순번</div>
            <div class="payment_board__item-payment-id title">결제 번호</div>
            <div class="payment_board__item-payment-status title">결제 상태</div>
            <div class="payment_board__item-payemnt-type title">결제 타입</div>
            <div class="payment_board__item-order-title title">주문명</div>
            <div class="payment_board__item-total-amount title">결제 총액</div>
            <div class="payment_board__item-created-at title">결제 날짜</div>
        </div>
        <div class="payment_board__item" v-for="(payment, index) in getPaymentItems" :key="payment.paymentId">
            <div class="payment_board__item-container">
                <div class="payment_board__item-index">{{ index }}</div>
                <div class="payment_board__item-payment-id">{{ payment.paymentId }}</div>
                <div class="payment_board__item-payment-status">{{ payment.paymentStatus }}</div>
                <div class="payment_board__item-payemnt-type">{{ payment.paymentType }}</div>
                <div class="payment_board__item-order-title">{{ payment.orderTitle }}</div>
                <div class="payment_board__item-total-amount">{{ payment.totalAmount }}</div>
                <div class="payment_board__item-created-at">{{ payment.createdAt }}</div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import instance from '@/plugin/CustomAxios';
import { defineComponent } from 'vue';

interface Payment {
    paymentId: string,
    orderTitle: string,
    totalAmount: number,
    paymentStatus: string,
    paymentType: string,
    createdAt: Date,
}

export default defineComponent({
        data(){
            return {
                month: 1,
                year: 2023,
                orderByType: 'LATEST',
                totalPages: 0,
                maxSize: 0,
                paymentItems: [] as Payment[],
                currentPage: 1
            }
        },
        mounted(){
            this.fetchPaymentItems(this.currentPage, this.year, this.maxSize, this.orderByType);
        },
        computed: {
            getPaymentItems(): Payment[]{
                return this.paymentItems
            },
        },
        methods: {
            async fetchPaymentItems(month: number, year: number, maxSize: number, orderByType: string){
                await instance.get(`/api/payments?month=${month}&year=${year}&size=${maxSize}&orderByType=${orderByType}`).then(response => {
                    if(response){
                        this.totalPages = response.data.totalPages;
                        this.paymentItems = response.data.content;
                    }
                    
                })
            },
            setCurrentPage(month: number){
                this.currentPage = month;
                this.fetchPaymentItems(this.currentPage, this.year, this.maxSize, this.orderByType)
            }
            
        }
    
    
})
</script>


<style lang="scss" scoped>

.selected{
    border-bottom: 1px solid white;

}

.btn {
    cursor: pointer;
}
.calendar{
    margin-top: 10vh;
    justify-content: center;
    display: flex;
}

.calendar__month{
    margin: 0 10px;
    color: white;
}

.title {
    color: white;
}
.payment_board__title-container {
    margin-top: 10vh;
    display: flex;
    justify-content: start;   
    padding-bottom: 2px;
    margin-bottom: 4px;
    border-bottom: 1px solid white;
}

.payment_board__item-container {
    display: flex;
    justify-content: start;   
}

.payment_board__item {
    color: white;
}


.payment_board__item-index{
    flex-grow: 0.3;
    flex-basis: 0;
}
.payment_board__item-payment-id{
    flex-grow: 2;
    flex-basis: 0;
}
.payment_board__item-payment-status{
    flex-grow: 1;
    flex-basis: 0;
}
.payment_board__item-payemnt-type{
    flex-grow: 0.5;
    flex-basis: 0;
}
.payment_board__item-order-title{
    flex-grow: 1;
    flex-basis: 0;
}
.payment_board__item-total-amount{
    flex-grow: 1;
    flex-basis: 0;
}
.payment_board__item-created-at{
    flex-grow: 1;
    flex-basis: 0;
}
    
</style>