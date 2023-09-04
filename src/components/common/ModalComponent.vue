<template>
    <div class="modal-overlay">
        <div class="modal">
        <slot></slot>
          <div>
            <div><button class="btn left-btn" @click="execute">등록</button></div>
            <div><button class="btn right-btn" @click="cancel">닫기</button></div>
          </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        visible: Boolean,
    },
    methods: {
      execute() {
        this.$emit('execute')  
      },
      cancel() {
        this.$emit('cancel')
      },
  },
})
</script>

<style lang="scss" scoped>
@import '../../assets/variable.scss';

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
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
}

.btn {
  background: none;
  color: white;
  border: 1px solid white;
  width: 300px;
  height: 30px;
  margin: 0 auto; 
}
</style>

