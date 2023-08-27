<template>
  <div class="outer-container">
    <div class="inner-container">
      <div
        class="order-block"
        v-for="order in orderList"
        :key="order.orderId"
        @click="openModal(order.orderId)"
      >
        <div class="order-top-container">
          <div class="order-id">[Order - {{ order.orderId }}]</div>
          <div class="in-out">
            {{ order.orderType === "IN" ? "매장" : "포장" }}
          </div>
          <div class="order-status">
            {{ order.orderStatus }}
          </div>
          <div class="payment-status">
            {{ order.paymentStatus }}
          </div>
        </div>
        <div class="receipt-top-container">
          <div class="menu-name">메뉴</div>
          <div class="menu-detail-container">
            <div class="price">금액</div>
            <div class="quantity">수량</div>
            <div class="menu-total-amount">총액</div>
          </div>
        </div>
        <li v-for="orderMenu in order.receipt" :key="orderMenu.menuName">
          <div class="menu-container">
            <div class="menu-name">{{ orderMenu.menuName }}</div>
            <div class="menu-detail-container">
              <div class="price">
                {{
                  `${orderMenu.price
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원`
                }}
              </div>
              <div class="quantity">{{ orderMenu.quantity }}개</div>
              <div class="menu-total-amount">
                {{ orderMenu.menuTotalAmount }}원
              </div>
            </div>
          </div>
        </li>
        <div class="receipt-bottom-container">
          <div class="menu-name"></div>
          <div class="menu-detail-container">
            <div class="price"></div>
            <div class="quantity">
              {{
                order.receipt.reduce((acc, cur) => {
                  return acc + cur.quantity;
                }, 0)
              }}개
            </div>
            <div class="menu-total-amount">
              {{
                `${order.totalAmount
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원`
              }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <OrderCancelModalComponent
      @paymentCancel="paymentCancel"
      @cancel="cancel"
      :visible="isModalVisible"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import instance from '@/plugin/CustomAxios';
import { Store } from 'vuex';
import OrderCancelModalComponent from '@/components/common/OrderCancelModalComponent.vue';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: Store<any>;
  }
}

interface Order {
    orderId: number,
    receipt: Receipt[],
    totalAmount: number,
    orderType: string,
    orderStatus: string,
    paymentStatus: string,
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
            orderList: [] as Order[],
            isModalVisible: false,
            currentOrderId: 0
        }
    },
    created(){
            instance.get('/api/orders?orderByType=LATEST').then(response => {
                try{
                    this.orderList = response.data.content
                }catch(error){
                    console.log(error);
                }
            })
    },
    methods: {
        openModal(orderId: number){
            this.currentOrderId = orderId;
            return this.isModalVisible = true;
        },
        closeModal(){
            return this.isModalVisible = false;
        },
        async paymentCancel(order: Order){
            try{
                await instance.put(`/api/orders/${this.currentOrderId}`)
                .then(response => {
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
        }
    },
    components: {
        OrderCancelModalComponent
    }
})
</script>

<style scoped>
.outer-container {
  display: flex;
  justify-content: center;
  margin: 15vh;
  padding: 10vh;

  border: 1px solid white;
  color: white;
  /* overflow-y: scroll; */
}

li {
  list-style: none;
}

.menu {
  font-weight: 600;
  font-size: 60px;
}

.list-container {
  display: flex;
  /* justify-content: space-between; */
  width: 200px;
}

.menu-detail-container {
  flex-grow: 6;
  flex-basis: 0;
  display: flex;
  text-align: end;
}

.price {
  flex-grow: 3;
  flex-basis: 0;
}

.menu-total-amount {
  flex-grow: 3;
  flex-basis: 0;
}

.quantity {
  flex-grow: 3;
  flex-basis: 0;
}

.menu-name {
  flex-grow: 4;
  flex-basis: 0;
}

/* .outer-container {
    color: white;
    width: 1400px;
    display: flex;
    justify-content: center;
} */

.menu-container {
  display: flex;
  justify-content: flex-end;
  align-items: center; /* 추가된 부분 */
}

.receipt-bottom-container {
  display: flex;
  justify-content: flex-end;
  align-items: center; /* 추가된 부분 */
  margin-top: 10px;
  align-content: cent;
  padding-top: 10px;
  border-top: 1px solid white;
}

.receipt-top-container {
  display: flex;
  justify-content: flex-end;
  align-items: center; /* 추가된 부분 */
  margin-bottom: 10px;
  align-content: cent;
  padding-top: 10px;
  border-bottom: 1px solid white;
}

.order-block {
  width: 900px;

  /* margin-bottom: 100px; */
}

.order-block {
  background-color: rgba(255, 255, 255, 0);
  color: rgb(255, 255, 255);
  border: 1px solid rgb(108, 183, 68);
  border-radius: 15px;
  cursor: pointer;
  padding: 30px;
  margin-top: 30px;
}

.order-top-container {
  display: flex;
  /* justify-content: space-between; */
  margin-bottom: 20px;
}

.order-id {
  flex-grow: 3;
  flex-basis: 0;
}
.order-status {
  color: rgb(50, 50, 223);
}

.payment-status {
  color: rgb(255, 255, 255);
  text-align: end;
  margin-left: 1vw;
}

.in-out {
  font-weight: 600;
  flex-grow: 3;
  flex-basis: 0;
  text-align: center;
}
</style>
