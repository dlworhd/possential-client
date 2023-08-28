<template>
<div class="btn-container">
        <div>
            <div>
              <button class="increase-btn btn" @click="increaseQuantity(menu)">
                +
              </button>
            </div>
            <div>
              <button class="decrease-btn btn" @click="decreaseQuantity(menu)">
                -
              </button>
            </div>
        </div>
        
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Menu } from '../../../store/index';

export default defineComponent({
    props: {
        menu: {
            type: Object as () => Menu,
            required: true
        }
    },
    methods: {

    increaseQuantity(menu: Menu) {
      this.$store.dispatch("increaseQuantityAction", menu);
    },
    decreaseQuantity(menu: Menu) {
      this.$store.dispatch("decreaseQuantityAction", menu);
    },
    }
})

</script>
<style lang="scss" scoped>
@import '../../../assets/variable.scss';

.btn {
    border: 1px solid white;
    background: none;
    color: white;
    width: 5vh;

}

</style>