<template>
<div class="page-btn">
    <div>
        <button @click="previousPage" class="page-btn__previous btn" >이전</button>
    </div>
    <div>
        <button @click="nextPage" class="page-btn__next btn">다음</button>
    </div>
</div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';

export default defineComponent({
    methods: {
        previousPage() {
            this.$emit('previousPage')
        },
        nextPage() {
            this.$emit('nextPage')
        },
    }
})
</script>

<style lang='scss' scoped>
@import '../../../assets/variable.scss';
.page-btn {
    margin-top: 5vh;
    display: flex;
    justify-content: center;
}

.btn {
    width: 10vw;
    height: 5vh;
    margin: 0 5px;
    border-right-color: $main--background-color;
}

</style>