<template>
  <div v-if="visible" class="modal-overlay">
    <div class="modal">
      <div @click="handlePaymentCancel" class="modal__payment-cancel-btn btn">
        결제 취소
      </div>
      <div @click="handleCancel" class="modal__cancel-btn btn">
        닫기
      </div>
    </div>
    
    </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        visible: Boolean
    },
    methods: {
        handlePaymentCancel(){
            this.$emit('paymentCancel')
        },
        handleCancel(){
            this.$emit('cancel')
        }
    }
})
</script>
<style lang='scss' scoped>
@import '../../../assets/variable.scss';

.modal-overlay {
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

.modal {
  background-color: $main--background-color;
//   padding: 20px;
  width: 15vw;
  // height: 10vh;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
}

.btn {
    background: none;
    color: white;
    text-align: center;
    border: 1px solid white;
    cursor: pointer;
}

.btn:hover {
  background-color: white;
  color: $main--text-hover-color;
}
</style>
