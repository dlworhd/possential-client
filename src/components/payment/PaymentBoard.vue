<template>
    <div class="monthly">
        <select @change="updateCurrentMonth" class="monthly__month">
            <option v-for="i in 12" :key="i">{{ i }}월</option>
        </select>

        <div class="monthly__order-by-type-container">
            <div @click="setOrderByType(type)" :class="{ 'payment_board__selected-order-by-type': type ===  currentOrderByType}" class="monthly__order-by-type btn" v-for="(type, index) in getOrderByTypes" :key="index" >
                    {{ type === 'LATEST' ? '최신순' : ' 오래된순'}}
            </div>
        </div>
    </div>
    
    <div class="payment-board">
        <div class="payment_board__title-container title">
            <div class="payment_board__item-index title">순번</div>
            <div class="payment_board__item-payment-id title">결제 고유 번호</div>
            <div class="payment_board__item-order-title title">주문명</div>
            <div class="payment_board__item-payemnt-type title">결제 방식</div>
            <div class="payment_board__item-payment-status title">결제 상태</div>
            <div class="payment_board__item-total-amount title">결제 총액</div>
            <div class="payment_board__item-created-at title">결제일</div>
        </div>
        <div class="payment_board__item" v-for="(payment, index) in getPaymentItems" :key="payment.paymentId">
            <div class="payment_board__item-container">
                <div class="payment_board__item-index">{{ index + 1 }}</div>
                <div class="payment_board__item-payment-id">{{ payment.paymentId.slice(0, 8) }}***</div>
                <div class="payment_board__item-order-title">{{ payment.orderTitle }}</div>
                <div class="payment_board__item-payemnt-type">{{ payment.paymentType }}</div>
                <div class="payment_board__item-payment-status">{{ payment.paymentStatus }}</div>
                <div class="payment_board__item-total-amount">{{ payment.totalAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}원</div>
                <div class="payment_board__item-created-at">
                    {{ payment.createdAt.toString().split('T')[0] }} 
                    {{ payment.createdAt.toString().split('T')[1] }}
                </div>
            </div>
        </div>
    </div>

    <div class="pagination">
            <button @click="prevPage" :disabled="currentPage === 1">
                이전
            </button>
            <button v-for="pageNumber in totalPages" :key="pageNumber" @click="goToPage(pageNumber - 1)">
                {{ pageNumber }}
            </button>
            <button @click="nextPage" :disabled="currentPage === totalPages">
                다음
            </button>
        </div>
</template>

<script lang="ts">
import instance from '@/plugin/CustomAxios';
import { defineComponent } from 'vue';
import { OrderByType } from '../store/common/HomeBoard.vue';

interface Payment {
    paymentId: string,
    orderTitle: string,
    totalAmount: number,
    paymentStatus: PaymentStatus,
    paymentType: PaymentType,
    createdAt: Date,
    orderByType: OrderByType
}

export enum PaymentStatus {
    PAYMENT_READY = 'PAYMENT_READY',
    PAYMENT_SUCCESS = 'PAYMENT_SUCCESS',
    PAYMENT_FAILURE = 'PAYMENT_FAILURE',
    PAYMENT_CANCELLATION = 'PAYMENT_CANCELLATION'
}

export enum PaymentType {
    CASH = 'CASH',
    KAKAOPAY = 'KAKAOPAY',
}

export default defineComponent({
        data(){
            return {
                month: new Date().getMonth(),
                year: new Date().getFullYear(),
                totalPages: 0,
                currentPage: 0,
                perSize: 20,
                paymentItems: [] as Payment[],
                currentOrderByType: OrderByType.LATEST, 
                orderByTypes: [OrderByType.LATEST, OrderByType.OLDEST],
            }
        },
        mounted(){
            this.fetchPaymentItems(this.month, this.year, this.perSize, this.currentPage, this.currentOrderByType);
        },
        computed: {
            getPaymentItems(): Payment[]{
                return this.paymentItems
            },
            getOrderByTypes(): OrderByType[]{
                return this.orderByTypes;
            }
        },
        methods: {
            async fetchPaymentItems(month: number, year: number, size: number,  page: number, orderByType: OrderByType){
                await instance.get(`/api/payments?month=${month}&year=${year}&size=${size}&page=${page}&orderByType=${orderByType}`).then(response => {
                    if(response){
                        this.totalPages = response.data.totalPages;
                        this.paymentItems = response.data.content;
                    }else {
                        console.log('에러');
                    }
                })
            },
            setCurrentMonth(month: number){
                this.month = month;
            },
            setOrderByType(orderByType: OrderByType){
                this.currentOrderByType = orderByType;
                this.fetchPaymentItems(this.month, this.year, this.perSize, this.currentPage ,this.currentOrderByType)
            },
            updateCurrentMonth(event: Event) {
                let selectedValue: number = parseInt((event.target as HTMLSelectElement).value);
                this.setCurrentMonth(selectedValue);
                this.fetchPaymentItems(this.month, this.year, this.perSize, this.currentPage ,this.currentOrderByType)
            },
            prevPage() {
                if (this.currentPage > 1) {
                    this.currentPage -= 1;
                }
                this.fetchPaymentItems(this.month, this.year, this.perSize, this.currentPage, this.currentOrderByType);
            },
            nextPage() {
                if (this.currentPage < this.totalPages) {
                    this.currentPage += 1;
                }
                this.fetchPaymentItems(this.month, this.year, this.perSize, this.currentPage, this.currentOrderByType);
            },
            goToPage(pageNumber: number) {
               this.currentPage = pageNumber;
               this.fetchPaymentItems(this.month, this.year, this.perSize, this.currentPage, this.currentOrderByType);
            }
        }
})
</script>


<style lang="scss" scoped>

.payment-board{
    width: 98vw;
    margin: 0 auto;
    padding: 2px 0;
    border-bottom: 1px solid white;
}

.payment_board__selected-month{
    border-bottom: 1px solid white;
}

.payment_board__selected-order-by-type{
    border-bottom: 1px solid white;
}

.monthly__order-by-type{
    margin: 0 2px;
    color: white;
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
    color: black;
    position: relative;
}

.title {
    color: white;
}

.monthly__order-by-type-container {
    display: flex;
    position: absolute;
    right: 1vw;
}
.payment_board__title-container {
    width: 98vw;
    margin: 5vh auto;
    display: flex;
    padding-bottom: 2px;
    margin-bottom: 4px;
    border-bottom: 1px solid white;
    align-items: center;
}

.payment_board__item-container {
    display: flex;
    margin: 0 auto;
    justify-content: start;   
    width: 98vw;
}

.payment_board__item {
    color: white;
}

.payment_board__item-index{
    flex-grow: 0.1;
    flex-basis: 0;
}
.payment_board__item-payment-id{
    flex-grow: 0.3;
    flex-basis: 0;
}
.payment_board__item-payment-status{
    flex-grow: 0.6;
    flex-basis: 0;
}
.payment_board__item-payemnt-type{
    flex-grow: 0.3;
    flex-basis: 0;
}
.payment_board__item-order-title{
    flex-grow: 1;
    flex-basis: 0;
}
.payment_board__item-total-amount{
    flex-grow: 0.3;
    flex-basis: 0;
    text-align: end;
}

.payment_board__item-created-at{
    flex-grow: 0.5;
    flex-basis: 0;
    text-align: end;

}
.pagination{
  display: flex;
  justify-content: center;
  margin: 5vh 0;
}

.pagination__page-number-btn{
  color: white;
  margin: 0 10px;
  width: 10px;
  text-align: center;
  cursor: pointer;
}

.pagination__item .btn{
    cursor: pointer;
}

.selectedPage {
    border-bottom: 1px solid white;
}

.btn {
    color: white;
}



</style>