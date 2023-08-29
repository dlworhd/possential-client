<template>
    <div class="order-total-price">
        총액 = {{ `${totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원` }}
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { mapState } from 'vuex';

export default defineComponent({
    computed: {
        ...mapState(['totalPrice']),
    },
  },
)

</script>

<style lang="scss" scoped>
@import '../../../assets/variable.scss';

.order-total-price {
  color: white;
  border-bottom: 1px solid white;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 5vh;
  background-color: $main--background-color;
}
</style>