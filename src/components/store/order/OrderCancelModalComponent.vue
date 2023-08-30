<template>
  <div v-if="visible" class="modal-overlay">
    <div class="modal">
        <button class="btn" @click="handlePaymentCancel">결제 취소</button>
        <button class="btn" @click="handleCancel">닫기</button>
    </div>
    
    </div>
</template>

<script lang="ts">
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
<style lang="scss" scoped>
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
  height: 10vh;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
}

.btn {
    background: none;
    color: white;
}
</style>
