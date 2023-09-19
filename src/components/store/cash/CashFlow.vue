<template>

    <div class="cashflow-board">

    <div class="presentAmount">현재 잔고: {{ presentAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}원</div>

        <div class="cashflow_board__title-container title">
            <div class="cashflow_board__item-created-at title">입출금 날짜</div>
            <div class="cashflow_board__item-title title">사유</div>

            <div class="cashflow_board__item-variable-amount title">변동 총액</div>
        </div>
        <div class="cashflow_board__item" v-for="(data, index) in cashDetailPage" :key="index"> 
            <div class="cashflow_board__item-container">
                <div class="cashflow_board__item-created-at">
                    {{ data.createdAt.toString().split(' ')[0] }} 
                </div>
                <div class="cashflow_board__item-title title">{{ data.reason }}</div>    
                <div class="cashflow_board__item-variable-amount">{{ data.variableAmount?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}원</div>
            </div>
        </div>
        
    </div>
    <div class="cashflow__dw-container">
        <div @click="openModal" class="cashflow__deposit-btn btn">
            입출금
        </div>
    </div>


    <ModalComponent v-if="isModalVisible" @execute="execute" @cancel="cancel">
        <label class="cashflow__reason title">사유</label>
        <div><input v-model="reason" class="cashflow__reason-input input"/></div>
        <div class="cashflow__amount title">금액</div>
        <div><input v-model="amount" class="cashflow__amount-input input"/></div>
        <div class="cashflow__option title">옵션</div>
        <div class="cashflow__option">
            <select class="cashflow__option-board" v-model="option">
                <option class="cashflow__deposit" value="deposit">입금</option>
                <option class="cashflow__withdraw" value="withdraw">출금</option>
            </select>
        </div>
    </ModalComponent>

    <div class="pagination">
        <button @click="prevPage" :disabled="currentPage === 0">
            이전
        </button>
        <button v-for="pageNumber in totalPages" :key="pageNumber" @click="goToPage(pageNumber - 1)">
            {{ pageNumber }}
        </button>
        <button @click="nextPage" :disabled="currentPage === totalPages - 1">
            다음
        </button>
    </div>
        

</template>

<script lang="ts">
import { defineComponent } from 'vue';
import instance from '../../../plugin/CustomAxios';
import ModalComponent from '@/components/common/ModalComponent.vue';

// export interface Cash{
//     totalPages: number,
//     presentAmount: number,
//     variableAmountPage: {} as 
// }

// export interface 

interface CashFlowData {
    reason: string,
    variableAmount: number,
    createdAt: Date
}

export default defineComponent({

    data() {
        return {
            maxSize: 20,
            currentPage: 0,
            totalPages: 0,
            presentAmount: 0,
            cashDetailPage: [] as CashFlowData[],
            isModalVisible: false,
            reason: '',
            option: 'deposit',
            amount: 0,
        }
    },
    components: {
        ModalComponent
    },

    mounted(){
        this.fetchCashFlow(this.currentPage)
    },
    methods: {
        async fetchCashFlow(page: number){
            const responseData = await instance.get(`/api/cash?size=${this.maxSize}&page=${page}`)
            this.cashDetailPage = responseData.data.cashDetailPage?.content
            this.presentAmount = responseData.data?.presentAmount
            this.totalPages = responseData.data.cashDetailPage?.totalPages
        },
        openModal(){
            this.isModalVisible = true;
        },
        async execute(){
                const cashData = {
                    amount: this.amount,
                    reason: this.reason,
                }
                await instance.post(`/api/cash/${this.option}`, cashData).then(() => {
                    this.isModalVisible = false;
                    this.fetchCashFlow(this.currentPage)
                }, error => {
                    console.log(error)
                })
        },
        cancel(){
            this.isModalVisible = false;
        },
        updateOption(event: Event) {
            const selectedValue = (event.target as HTMLSelectElement).value;
            this.option = selectedValue;
        },
        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage -= 1;
            }
            this.fetchCashFlow(this.currentPage);
        },
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage += 1;
            }
            this.fetchCashFlow(this.currentPage);
        },
        goToPage(pageNumber: number) {
               this.currentPage = pageNumber;
               this.fetchCashFlow(this.currentPage);
            },
    }}
    )


</script>
<style lang="scss" scoped>
.presentAmount {
    margin-top: 10vh;
    color: white;
}

.btn {
    color: white;
    cursor: pointer;
    margin: 0;
    border: 1px white solid;
    width: 5vw;
    text-align: center;
}

.btn:hover{
    background-color: white;
    color: black;
}

.cashflow__withdraw-btn {
    margin-left: 1vw;
}

.cashflow__dw-container {
    width: 98vw;
    display: flex;
    justify-content: end;
    margin: 0 auto;
    margin-top: 2vh;

}
.cashflow-board{
    width: 98vw;
    margin: 0 auto;
    padding: 2px 0;
    border-bottom: 1px solid white;
}

.cashflow_board__title-container {
    width: 98vw;
    margin: 5vh auto;
    display: flex;
    padding-bottom: 2px;
    margin-bottom: 4px;
    border-bottom: 1px solid white;
    align-items: center;
}

.cashflow_board__item-container {
    display: flex;
    margin: 0 auto;
    justify-content: start;   
    width: 98vw;
}

.cashflow_board__item-title{
    flex-grow: 1;
    flex-basis: 0;
    text-align: start;
}
.cashflow_board__item-variable-amount{
    flex-grow: 0.2;
    flex-basis: 0;
    text-align: end;
}

.cashflow_board__item-created-at{
    flex-grow: 0.2;
    flex-basis: 0;
    text-align: start;
}

.cashflow_board__item {
    color: white;
}

.title {
    color: white;
}

.input {
    width: 100%;
}
.cashflow__option-board{
    width: 100%;
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



</style>