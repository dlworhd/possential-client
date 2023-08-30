<template>
    <div class="modal-overlay">
        <div class="modal">
        <slot></slot>
          <div>
            <div><button class="btn" @click="cancel">닫기</button></div>
          </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
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

</style>

