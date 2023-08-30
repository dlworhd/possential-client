<template>
    <div class="monthly">
        <div @click="setCurrentMonth(i)" :class="{ 'payment_board__selected-month': i === month }" class="monthly__month btn" v-for="i in 12" :key="i">{{ i }}월</div>
        <div @click="setOrderByType(type)" :class="{ 'payment_board__selected-order-by-type': type ===  currentOrderByType}" class="monthly__order-by-type btn" v-for="(type, index) in getOrderByTypes" :key="index" >
                {{ type === 'LATEST' ? '최신순' : ' 오래된순'}}
        </div>
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
                <div class="payment_board__item-created-at">
                    {{ payment.createdAt.toString().split('T')[0] }} 
                    {{ payment.createdAt.toString().split('T')[1] }}
                </div>
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
    orderByType: OrderByType
}

enum OrderByType {
    LATEST = 'LATEST',
    OLDEST = 'OLDEST'
}

export default defineComponent({
        data(){
            return {
                month: new Date().getMonth() + 1,
                year: new Date().getFullYear(),
                totalPages: 0,
                maxSize: 0,
                paymentItems: [] as Payment[],
                currentOrderByType: OrderByType.LATEST, 
                orderByTypes: [OrderByType.LATEST, OrderByType.OLDEST],
            }
        },
        mounted(){
            this.fetchPaymentItems(this.month, this.year, this.maxSize, this.currentOrderByType);
        },
        computed: {
            getPaymentItems(): Payment[]{
                return this.paymentItems
            },
            getOrderByTypes(): OrderByType[]{
                return this.orderByTypes;
            },
        },
        methods: {
            async fetchPaymentItems(month: number, year: number, maxSize: number, orderByType: OrderByType){
                await instance.get(`/api/payments?month=${month}&year=${year}&size=${maxSize}&orderByType=${orderByType}`).then(response => {
                    if(response){
                        this.totalPages = response.data.totalPages;
                        this.paymentItems = response.data.content;
                    }
                    
                })
            },
            setCurrentMonth(month: number){
                this.month = month;
                this.fetchPaymentItems(this.month, this.year, this.maxSize, this.currentOrderByType)
            },
            setOrderByType(orderByType: OrderByType){
                this.currentOrderByType = orderByType;
                this.fetchPaymentItems(this.month, this.year, this.maxSize, this.currentOrderByType)
            },
            formattedDateString(date: Date): string{
                return `${date.getFullYear}년 ${date.getMonth}월 ${date.getDay}일 ${date.getHours}시 ${date.getMinutes}분 ${date.getSeconds}초`
            }
           
        }
    
    
})
</script>


<style lang="scss" scoped>

.payment_board__selected-month{
    border-bottom: 1px solid white;
}

.payment_board__selected-order-by-type{
    border-bottom: 1px solid white;
}

.monthly__order-by-type{
    margin: 0 2px;
    color: white;
    position: relative;
    right: -40px;
}

.btn {
    cursor: pointer;
}
.monthly{
    margin-top: 10vh;
    justify-content: center;
    display: flex;
}

.monthly__month{
    margin: 0 10px;
    color: white;
}

.title {
    color: white;
}
.payment_board__title-container {
    margin-top: 10vh;
    display: flex;

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