<template>
    <div class="modal-overlay" v-if="visible">
        <div class="modal">
        <slot></slot>
        
            <button class="registration-button" @click="createNewMenu">등록</button>
            <button class="close-button" @click="closeModal">닫기</button>

        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapState, mapMutations } from 'vuex';


export default defineComponent({
    props: {
        visible: Boolean,
    },
    computed: {
        ...mapState(['newMenu'])
    },
    methods: {
    createNewMenu() {
      this.$emit('createNewMenu')  
    },
    closeModal() {
        this.$emit('close');
    },
  },
})
</script>

<style scoped>
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
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
}

.close-button {
  margin-top: 10px;
}

button {
    cursor: pointer;
}

</style>

