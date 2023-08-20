<template>
    <select v-model="selectOption" @change="updateOption">
        <option :value="optionType.IN">IN</option>
        <option :value="optionType.OUT">OUT</option>
    </select>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions, mapState } from 'vuex';
import { Store } from 'vuex'
import { OptionType } from '@/store';


declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: Store<any>;
  }
}

export default defineComponent({
    computed:{
        ...mapState(['selectOption']),
        optionType() {
            return OptionType;
        }
    },
    methods: {
        ...mapActions(['updateSelectOption']),
        updateOption(event: Event){
            const selectedValue = (event.target as HTMLSelectElement).value;
            this.updateSelectOption(selectedValue);
        }
    },
})

</script>