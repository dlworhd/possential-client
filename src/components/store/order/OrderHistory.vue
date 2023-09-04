<template>
    <div class="order-history" @scroll="loadMore" ref="scrollContainer">
      <div class="order-history__order" v-for="order in getOrderItems" :key="order.orderId" @click="openModal(order.orderId)">        
        <div class="order-history__date-info">
          <div class="order-history__date">{{order.orderDate.toString().split('T')[0]}}</div>
          <div class="order-history__time">{{order.orderDate.toString().split('T')[1]}}</div>
        </div>
        <div class="order-history__status-container">
          <div class="order-history__order-id">[Order - {{ order.orderId }}]</div>
          <div class="order-history__order-type">
            {{ order.orderType === "IN" ? "매장" : "포장" }}
          </div>
          <div class="order-history__order-status">
            {{ order.orderStatus }}
          </div>
          <div class="order-history__payment-status">
            {{ order.paymentStatus }}
          </div>
        </div>
        <div class="order-history__receipt-title-container">
          <div class="order-history__menu-name">메뉴</div>
          <div class="order-history__receipt-detail-container">
            <div class="order-history__menu-price">금액</div>
            <div class="order-history__menu-quantity">수량</div>
            <div class="order-history__menu-total-amount">총액</div>
          </div>
        </div>
        <li v-for="orderMenu in order.receipt" :key="orderMenu.menuName">
          <div class="order-history__receipt-menu-container">
            <div class="order-history__menu-name">
              {{ 
                orderMenu.menuName.toString().includes('deleted') ? 
                orderMenu.menuName.toString().substring(orderMenu.menuName.toString().lastIndexOf('deleted')) : 
                orderMenu.menuName
              }}
            </div>
            <div class="order-history__receipt-detail-container">
              <div class="order-history__menu-price">
                {{
                  `${orderMenu.price
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원`
                }}
              </div>
              <div class="order-history__menu-quantity">{{ orderMenu.quantity }}개</div>
              <div class="order-history__menu-total-amount">
                {{ orderMenu.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}원
              </div>
            </div>
          </div>
        </li>
        <div class="order-history__receipt-total-container">
          <div class="order-history__menu-name"></div>
          <div class="order-history__receipt-detail-container">
            <div class="order-history__menu-price"></div>
            <div class="order-history__menu-quantity">
              {{
                order.receipt.reduce((acc: any, cur: any) => {
                  return acc + cur.quantity;
                }, 0)
              }}개
            </div>
            <div class="order-history__menu-total-amount">
              {{
                `${order.totalAmount
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원`
              }}
            </div>
          </div>
      </div>
    </div>
    <OrderCancelModalComponent @paymentCancel="paymentCancel" @cancel="cancel" :visible="isModalVisible"/>
</div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import { mapGetters, mapMutations } from 'vuex';
import { OrderByType } from '../common/HomeBoard.vue';
import { PaymentStatus } from '../payment/PaymentBoard.vue';
import OrderCancelModalComponent from './OrderCancelModalComponent.vue';
import instance from '@/plugin/CustomAxios';
import {AxiosResponse} from 'axios';

export enum OrderType {
  IN = 'IN',
  OUT = 'OUT',
}

export enum OrderStatus {
    ORDER_NOT_PAID = 'ORDER_NOT_PAID',
    ORDER_SUCCESS = 'ORDER_SUCCESS',
    ORDER_READY = 'ORDER_READY',
    ORDER_CANCELLATION = 'ORDER_CANCELLATION'
}

export interface Order {
    orderId: number,
    receipt: Receipt[],
    totalAmount: number,
    orderType: OrderType,
    orderStatus: OrderStatus,
    paymentStatus: PaymentStatus,
    orderDate: Date
}

type Receipt = {
    menuName: string,
    quantity: number,
    price: number,
    menuTotalAmount: number
}

export default defineComponent({
    data(){
        return {
            isModalVisible: false,
            currentOrderId: 0,
            maxSize: 10,
            totalPages: 0,
            currentPage: 0,
            orderByType: OrderByType.LATEST,
            isLoading: false
        }
    },
    mounted(){
            instance.get(`/api/orders?orderByType=${this.orderByType}&size=${this.maxSize}&page=${this.currentPage}`).then(response => {
                try{
                    this.totalPages = response.data.totalPages;
                    const orderItems = response.data.content;
                    this.setOrderItems(orderItems);
                }catch(error){
                    console.log(error);
                }
            })
    },
    computed: {
      ...mapGetters(['getOrderItems'])
    },
    methods: {
        ...mapMutations(['setOrderItems']),
        openModal(orderId: number){
            this.currentOrderId = orderId;
            return this.isModalVisible = true;
        },
        closeModal(){
            return this.isModalVisible = false;
        },
        async paymentCancel(){
            try{
                await instance.put(`/api/orders/${this.currentOrderId}`)
                .then((response: AxiosResponse) => {
                    if(response.status === 200){
                        alert('취소 성공');
                    }
                }).catch(() => {
                    alert('취소 실패');
                })
                this.closeModal()
            }catch(error){
                console.log(error);
                this.closeModal()
            }
        },
        cancel(){
            this.isModalVisible = false;
        },
        async loadMore() {
          console.log('loadmore실행');
          
          const scrollContainer = this.$refs.scrollContainer as HTMLDivElement;
          if (
            scrollContainer.scrollHeight - scrollContainer.scrollTop <=
              scrollContainer.clientHeight + 50 &&
            !this.isLoading &&
            this.currentPage < this.totalPages
          ) {
          this.isLoading = true;

          try {
            const nextPage = this.currentPage + 1;
            const response = await instance.get(
              `/api/orders?orderByType=${this.orderByType}&size=${this.maxSize}&page=${nextPage}`
            );
            const orderItems = response.data.content;
            this.setOrderItems([...this.getOrderItems, ...orderItems]);
            this.currentPage = nextPage;
          } catch (error) {
            console.log(error);
          }

          this.isLoading = false;
        }
      },
    },
    components: {
        OrderCancelModalComponent,
    }
})
</script>

<style lang='scss' scoped>
@import '../../../assets/variable.scss';

.order-history {
  height: 100vh;
  margin: 0;
  padding: 10vh;
  color: white;
  overflow-y: scroll !important;
}

.order-history__receipt-detail-container {
  flex-grow: 6;
  flex-basis: 0;
  display: flex;
  text-align: end;

}

.order-history__menu-price {
  flex-grow: 3;
  flex-basis: 0;
}

.order-history__menu-total-amount {
  flex-grow: 3;
  flex-basis: 0;
}

.order-history__menu-quantity {
  flex-grow: 3;
  flex-basis: 0;
}

.order-history__menu-name {
  flex-grow: 4;
  flex-basis: 0;
}

.order-history__receipt-total-container {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 10px;
  align-content: cent;
  padding-top: 10px;
  border-top: 1px solid white;
}
.order-history__receipt-menu-container{
  display: flex;
}

.order-history__receipt-title-container {
  display: flex;
  justify-content: end;
  align-items: center;
  margin-bottom: 10px;
  align-content: cent;
  padding-top: 10px;
  border-bottom: 1px solid white;
}

.order-history__order {
  width: 900px;
  margin: 0 auto;
  list-style: none;
}

.order-history__order {
  background-color: rgba(255, 255, 255, 0);
  color: rgb(255, 255, 255);
  border: 1px solid white;
  border-radius: 15px;
  cursor: pointer;
  padding: 30px;
  margin-top: 30px;
}

.order-history__status-container {
  display: flex;
  /* justify-content: space-between; */
  margin-bottom: 20px;
}

.order-history__order-id {
  flex-grow: 3;
  flex-basis: 0;
}

.order-history__order-type {
  font-weight: 600;
  flex-grow: 3;
  flex-basis: 0;
  text-align: center;
}
.order-history__order-status {
  color: rgb(50, 50, 223);
}
.order-history__payment-status {
  color: rgb(255, 255, 255);
  text-align: end;
  margin-left: 1vw;
}

.selectedPage{
  border-bottom: 1px solid white;
  font-weight: 600;
}

.order-history__date-info{
  display: flex;
  justify-content: end;
}

.order-history__time{
  margin-left: 5px;
}
</style>
