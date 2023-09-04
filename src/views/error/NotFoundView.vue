<template>
    <div class="message-container">
        <div class="message-container__message">잘못된 경로입니다. Error Code = 404 Not Found</div>
    </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';

export default defineComponent({

})

</script>

<style lang='scss' scoped>
@import '../../assets/variable.scss';

.message-container {
    padding-top: 50vh;
    color: white;
}

.message-container__message {
    text-align: center;
}
</style>