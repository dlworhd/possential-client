<template>
  <div class="option-container">
    <select v-model="selectOption" @change="updateOption">
      <option value="IN">IN</option>
      <option value="OUT">OUT</option>
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
    ...mapState(["selectOption"]),
  },
  methods: {
    ...mapActions(["updateSelectOption"]),
    updateOption(event: Event) {
      const selectedValue = (event.target as HTMLSelectElement).value;
      this.updateSelectOption(selectedValue);
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
.option-container {
  display: flex;
  justify-content: space-between;
  background: none;
  position: relative;
  top: 0;
  width: inherit;
  border-top: 1px solid white;
  border-bottom: 1px solid white;
}

.time {
  color: white;
  margin-right: 10px;
}
</style>
