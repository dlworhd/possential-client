<template>
    <div class="menu-grid">
    <button @click="addToCart(menu)" class="menu" v-for="menu in MenuList" :key="menu.menuId">
    {{ menu.menuName }}
    {{ menu.price }}
    </button>
    <button @click="previousPage">이전</button>
    <button @click="nextPage">다음</button>
</div>
</template>

<script lang="ts">
import axios from 'axios';
import { defineComponent } from 'vue'
import { mapState, mapMutations } from 'vuex/types/helpers.js';



export interface Menu {
    menuId: number,
    menuName: string
    price: number
}

//임시 스토어 아이디
const storeId = "09efa9fe-79d9-4f11-a3bd-9507c24aab5b"

export default defineComponent({
    data(){
        return {
            MenuList: [] as Menu[],
            pageInfo: {},
            currentPage: 0,
            totalPages: 0,
            maxSize: 12
        }
    },
    mounted() {
        this.fetchMenuList();
    },
    computed: {
        ...mapState(['cartItems'])
    },
    methods: {
        fetchMenuList() {
            axios.get(`/api/stores/${storeId}/menu?size=${this.maxSize}&page=${this.currentPage}`)
            .then((response) => {
                this.MenuList = response.data.content
                this.currentPage = response.data.pageable.pageNumber
                this.totalPages = response.data.totalPages
            }).catch((error) => {
                console.log(error);
            })
        },
        previousPage() {
            if(this.currentPage > 0){
                this.currentPage -= 1;
                this.fetchMenuList();
            }
        },
        nextPage() {
            if(this.currentPage < this.totalPages){
                this.currentPage += 1;
                this.fetchMenuList();
            }
        },
        //mapMutations을 사용하여 'addCartItem' 뮤테이션을 컴포넌트에 매핑한다. 
        //이렇게 매핑하면 this.addCartItem 메서드를 컴포넌트 내에서 사용할 수 있음
        ...mapMutations(['addToCart']),  
        addItem(menu: Menu){
            this.addToCart(menu)
        }
    }
})   



</script>

<style scoped>
.menu {
    color: white;
    width: 200px;
    height: 200px;
    border: 1px solid blue;
}

.menu-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    list-style: none;
    padding: 100px;
    text-align: center;
}

</style>