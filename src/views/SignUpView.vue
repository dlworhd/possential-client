<template>
    <SignUpForm class="view" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SignUpForm from '../components/user/SignUpForm.vue'

export default defineComponent({
    components: {
        SignUpForm
    }
})
</script>
