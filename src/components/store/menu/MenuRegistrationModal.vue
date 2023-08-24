<template>
    <div>
        <ModalComponent @execute="execute" @cancel="cancel">
                메뉴 이름 <input v-model="newMenu.menuName"/>
                메뉴 가격 <input v-model="newMenu.price"/>
        </ModalComponent>
    </div>
</template>

<script lang="ts">
import instance from '@/plugin/CustomAxios';
import { defineComponent } from 'vue';
import { mapMutations } from 'vuex';
import ModalComponent from '@/components/common/ModalComponent.vue';


export interface NewMenu {
    menuName: string
    price: number,
}

export default defineComponent({
    props:{
        visible: Boolean
    },
    data() {
        return{
            newMenu: {
                menuName: '',
                price: 0
            },
        }
    },
    methods:{
        
        execute(){
            this.createNewMenu()
        },
        cancel(){
            this.$emit('closeModal')
        },
        async createNewMenu(){
            try{
                const newMenu = {
                    menuName: this.newMenu.menuName,
                    price: this.newMenu.price
                }
                const response = await instance.post(`/api/menu`, newMenu)
                this.$router.push('/pos')
                console.log(response);
                this.$emit('closeModal')
                this.$emit('fetchMenuList')

            } catch {
                console.log('error');
                
            }
            
        },
        ...mapMutations(['addToCart']), 
    },
    components:{
        ModalComponent
    }
})
</script>