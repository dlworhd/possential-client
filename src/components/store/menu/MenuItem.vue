<template>
    <div class="menu-grid">
        <button @click="addToCart(menu)" class="menu" v-for="menu in menuList" :key="menu.menuId">
        {{ menu.menuName }}
        {{ menu.price }}
        </button>
    </div>
    <div v-if="hasAnyMenu()">
        <button @click="previousPage">이전</button>
        <button @click="nextPage">다음</button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapState, mapMutations } from 'vuex';
import instance from '@/plugin/CustomAxios';

export interface Menu {
    menuId: number,
    menuName: string
    price: number,
    quantity: number,
}

export interface CartDetail {
    totalPrice: number
}

export default defineComponent({
    data(){
        // 데이터 초기화
        return {
            menuList: [] as Menu[],
            pageInfo: {},
            currentPage: 0,
            totalPages: 0,
            maxSize: 12,
        }
    },
    //Component가 DOM에 마운트 된 후에 실행
    mounted() {
        this.fetchMenuList(this.storeId)
        this.$store.dispatch('fetchMenuListAction', this.menuList)
    },
    computed: {
        ...mapState(['cartItems', 'menuItems', 'storeId']),
    },
    methods: {
        getMenuList(): Menu []{
          return this.$store.state.getter.getMenuList(); 
        },
        hasAnyMenu(){
            return this.menuList.length > 0
        },
        fetchMenuList(storeId: string) {
            instance.get(`/api/menu?size=${this.maxSize}&page=${this.currentPage}`)
            .then((response) => {
                this.menuList = response.data.content
                this.currentPage = response.data.pageable.pageNumber
                this.totalPages = response.data.totalPages
            }).catch((error) => {
                if(error.code)
                console.log(error);
            })
        },
        previousPage() {
            if(this.currentPage > 0){
                this.currentPage -= 1;
                this.fetchMenuList(this.storeId);
            }
        },
        nextPage() {
            if(this.currentPage < this.totalPages){
                this.currentPage += 1;
                this.fetchMenuList(this.storeId);
            }
        },
        //mapMutations을 사용하여 'addCartItem' 뮤테이션을 컴포넌트에 매핑한다. 
        //이렇게 매핑하면 this.addCartItem 메서드를 컴포넌트 내에서 사용할 수 있음
        ...mapMutations(['addToCart']),  
        addCartItem(menu: Menu){
            this.addToCart(menu)
        },

    }
})   



</script>

<style scoped>
.menu {
    background-color: rgba(255, 255, 255, 0);
    color: rgb(255, 255, 255);
    width: 200px;
    height: 200px;
    border: 1px solid rgb(108, 183, 68);
    border-radius: 15px;
    cursor: pointer;
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