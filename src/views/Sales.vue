<template>
    
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';
export default defineComponent({


    computed:{
        async getOrderList(){
            axios.get('http://localhost:8080/api/orders/')
        }
    }



})


</script>