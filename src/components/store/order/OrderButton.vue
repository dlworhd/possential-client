<template>
    <div v-if="isLogin" @click="openModal" class="order-btn">주문/결제</div>
    <div v-if="isModalVisible" class="order-modal">
        <div class="order-modal__overlay">
        <div class="order-modal__content">
        <div class="order-modal__order-type">
            <div class="order-modal__order-type-container">
                <div class="order-modal__cash-type-btn btn" @click="execute('CASH')">현금</div>
                <div class="order-modal__kakaopay-type-btn btn" @click="execute('KAKAOPAY')">카카오페이</div>
            </div>
        </div>
          <div>
            <div><button class="order-modal__cancel-btn btn" @click="cancel">닫기</button></div>
          </div>
        </div>
    </div>
    </div>
</template>

<script lang="ts">
import store from '@/store';
import { defineComponent } from 'vue';
import { mapState } from 'vuex';

export default defineComponent({
data() {
    return {
        isModalVisible: false,
    }
},
computed: {
    ...mapState(['isLogin'])
},
components: {

},
methods: {
    closeModal() {
      this.isModalVisible = false;
    },
    openModal() {
      this.isModalVisible = true;
    },
    cancel(){
        this.isModalVisible = false
    },
    execute(option: string){
        if(option === 'KAKAOPAY' && store.state.totalPrice <= 0){
            alert('결제 금액은 최소 1원 이상이어야 합니다.')
        } else {
            store.commit('setPaymentType', option);
            store.dispatch('sendOrder');
            this.isModalVisible = false

        }
    }
}

})

</script>

<style lang="scss" scoped>
@import '../../../assets/variable.scss';

.order-btn {
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid white;
    height: 10vh;
}

.btn {
    color: white;
    border: 1px solid white;
    text-align: center;
    padding: 10px;
    cursor: pointer;
}


.order-modal__cash-type-btn{
    flex-grow: 1;
    flex-basis: 0;
    color: white;
    margin-right: 5px;
}

.order-modal__cash-type-btn:hover{
    color: black;
    background-color: white;
}


.order-modal__kakaopay-type-btn{
    flex-grow: 1;
    flex-basis: 0;
    color: yellow;
    margin-left: 5px;
    border: 1px solid yellow;
}

.order-modal__kakaopay-type-btn:hover{
    color: black;
    border: 1px solid yellow;
    background-color: yellow;
}

.order-modal__order-type-container {
    display: flex;
    justify-content: space-around;
    margin-bottom: 10px;
}

.order-modal__overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.order-modal__content {
  background-color: $main--background-color;
  padding: 20px;
  width: 30vw;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
}

.btn {
  width: 100%;
  border: 1px solid white;
  padding: 10px;
  background-color: $main--background-color;
}

.btn-container {
  margin-top: 10px;
}

</style>