<template>
<div class="order-detail">
  <select class="order-detail__select" v-model="orderType" @change="updateOption">
    <option class="order-detail__option-in" name="option" value="IN">매장</option>
    <option name="order-detail__option-out" value="OUT">포장</option>
  </select>
  <div class="time">
      {{ currentTime }}
  </div>
</div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import { mapState, mapMutations } from 'vuex';

export default defineComponent({
  data() {
    return {
      currentTime: new Date().toLocaleTimeString()
    };
  },
  mounted() {
    this.updateTime(); // 컴포넌트가 마운트되면 실시간 시간 업데이트 시작
  },
  computed: {
    ...mapState(['orderType']),
  },
  methods: {
    ...mapMutations(['setOrderType']),
    updateOption(event: Event) {
      const selectedValue = (event.target as HTMLSelectElement).value;
      this.setOrderType(selectedValue);
    },
    updateTime() {
      setInterval(() => {
        this.currentTime = new Date().toLocaleTimeString();

      }, 1000); // 1초마다 시간 업데이트
    },
  },
});
</script>

<style lang='scss' scoped>
@import '../../../assets/variable.scss';

.order-detail{
  display: flex;
  border-bottom: 1px solid white;
  justify-content: space-between;
  align-items: center;
  height: 5vh;
  background-color: $main--background-color;

}
.order-detail__select {
  flex-grow: 7;
  flex-basis: 0;
  height: 100%;
  width: 70%;
  text-align: center;
  font-size: 15px;
  font-weight: 600;
}

.time {
  flex-grow: 3;
  flex-basis: 0;
  color: white;
  text-align: center;
}
</style>
