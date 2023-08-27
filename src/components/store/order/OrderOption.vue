<template>
  <div class="option-container">
    <select class="option" v-model="orderType" @change="updateOption">
      <option value="IN">매장</option>
      <option value="OUT">포장</option>
    </select>
    <div>
        {{ currentWeather }}
    </div>
    <div class="time">
      {{ currentTime }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapState } from "vuex";

export default defineComponent({
  data() {
    return {
      currentTime: new Date().toLocaleTimeString(),
      currentWeather: "",
    };
  },
  mounted() {
    this.updateTime(); // 컴포넌트가 마운트되면 실시간 시간 업데이트 시작
  },
  computed: {
    ...mapState(["orderType"]),
  },
  methods: {
    ...mapActions(["updateOrderType"]),
    updateOption(event: Event) {
      const selectedValue = (event.target as HTMLSelectElement).value;
      this.updateOrderType(selectedValue);
    },
    updateTime() {
      setInterval(() => {
        this.currentTime = new Date().toLocaleTimeString();

      }, 1000); // 1초마다 시간 업데이트
    },
  },
});
</script>

<style>
.option-container{
  display: flex;
  border-bottom: 1px solid white;
  justify-content: space-between;
  align-items: center;
  height: 5vh;
  overflow-y: hidden;
}
.option {
  height: 100%;
  width: 70%;
  text-align: center;
  font-size: 15px;
  font-weight: 600;
}

.time {
  right: 0;
  color: white;
  padding: 0 15px;
}
</style>
