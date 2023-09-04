<template>
  <div class="menu-modal">
    <ModalComponent @execute="execute" @cancel="cancel">
      <div class="menu-modal__menu-name">메뉴 이름</div>
      <div><input v-model="newMenu.menuName" /></div>
      <div class="menu-modal__menu-price">메뉴 가격</div>
      <div><input v-model="newMenu.price" /></div>
    </ModalComponent>
  </div>
</template>

<script lang='ts'>
import instance from '@/plugin/CustomAxios';
import { defineComponent } from 'vue';
import { mapMutations } from 'vuex';
import ModalComponent from '@/components/common/ModalComponent.vue';

export interface NewMenu {
  menuName: string;
  price: number;
}

export default defineComponent({
  props: {
    visible: Boolean,
  },
  data() {
    return {
      newMenu: {
        menuName: '',
        price: 0,
      },
    };
  },
  methods: {
    execute() {
      this.createNewMenu();
    },
    cancel() {
      this.$emit('closeModal');
    },
    async createNewMenu() {
      try {
        const newMenu = {
          menuName: this.newMenu.menuName,
          price: this.newMenu.price,
        };
        await instance.post(`/api/menu`, newMenu).then(response => {
          if(response && response.status === 200){
            this.$router.push('/');
            console.log(response);
            this.$emit('closeModal');
            this.$emit('fetchMenuList');
          } else {
            alert('등록에 실패하였습니다');
          }
        })
      } catch {
        console.log('error');
      }
    },
    ...mapMutations(['addCartItem']),
  },
  components: {
    ModalComponent,
  },
});
</script>

<style lang='scss' scoped>
input {
  width: 300px;
  height: 30px;
}

.menu-modal{
  margin: 0 auto;
}

.menu-modal__menu-name {
    color: white;
}

.menu-modal__menu-price {
    color: white;
}
</style>
