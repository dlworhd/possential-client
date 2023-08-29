<template>
<div class="order-container">
    <div class="order-container__item" v-for="menu in cartItems" :key="menu.menuId">
        <div class="order-container__item-info">
            <div class="order-container__item-name">
            {{ menu.menuName }}
            </div>
            <div class="order-item__quantity">
            {{ menu.quantity }}개
            </div>
        </div>
        <div class="order-cart__option">
            <div class="order-cart__btn-group">
                <div class="order-cart__increase-btn">
                    <button class="increase-btn btn" @click="increaseItemQuantity(menu.menuId)">
                        +
                    </button>
                </div>
                <div class="order-cart__decrease-btn btn">
                    <button class="decrease-btn btn" @click="decreaseItemQuantity(menu.menuId)">
                        -
                    </button>
                </div>
            </div>  
        </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapMutations, mapState } from 'vuex';

export default defineComponent({
    computed: {
        ...mapState(['cartItems']),
    },
    methods: {
        ...mapMutations(['increaseQuantity', 'decreaseQuantity']),
        increaseItemQuantity(menuId: number) {
            this.increaseQuantity(menuId)
        },
        decreaseItemQuantity(menuId: number) {
            this.decreaseQuantity(menuId)
       },
    }
})
</script>

<style lang="scss" scoped>
@import '../../../assets/variable.scss';

.order-container {
  overflow-y: scroll;
  overflow-x: hidden;
  height: 75vh;
  border-bottom: 1px solid white;
  background-color: $main--background-color;
}
.order-container__item {
  display: flex;
  color: white;
  border: 1px solid white;
  justify-content: space-between;
}

.order-container__item-info {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 0 10px;
    background-color: $main--background-color;
}

.order-container__item-name {
    flex-grow: 9;
    flex-basis: 0;
}

.order-item__quantity {
    flex-grow: 2;
    flex-basis: 0;
    text-align: end;

}

.btn {
    border: 1px solid white;
    background: none;
    color: white;
    width: 5vh;
}


</style>