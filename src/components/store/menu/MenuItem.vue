<template>
    <div class="menu-grid">
        <button @click="addToCart(menu)" class="menu-item" v-for="menu in menuList" :key="menu.menuId">
        {{ menu.menuName }}
        {{ menu.price }}
        </button>
        <button @click="openModal" v-for="i in 24 - menuList.length" :key="i" class="menu-item empty">
            메뉴 추가
        </button>
        <AddMenuModal :visible="isModalVisible" @close="closeModal" @createNewMenu="createNewMenu">
                    메뉴 이름 <input v-model="newMenu.menuName"/>
                    메뉴 가격 <input v-model="newMenu.price"/>
        </AddMenuModal>
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
import AddMenuModal from './AddMenuModal.vue';

export interface Menu {
    menuId: number,
    menuName: string
    price: number,
    quantity: number,
}

export interface NewMenu {
    menuName: string
    price: number,
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
            isModalVisible: false,
            newMenu: {
                menuName: '',
                price: 0
            }
            
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
        createNewMenu(){
            const newMenu = {
                menuName: this.newMenu.menuName,
                price: this.newMenu.price
            }
            const response = instance.post(`/api/menu`, newMenu)
            console.log(response);
            
        },
        openModal() {
            this.isModalVisible = true;
        },
        closeModal() {
            this.isModalVisible = false;
        },
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
        ...mapMutations(['addToCart', 'addNewMenu']),  
        addCartItem(menu: Menu){
            this.addToCart(menu)
        },

    },
    components: {
        AddMenuModal
    }
})   

</script>

<style scoped>
.menu-item {
    background-color: rgba(255, 255, 255, 0);
    color: rgb(255, 255, 255);
    width: 150px;
    height: 150px;
    border: 1px solid rgb(108, 183, 68);
    border-radius: 15px;
    cursor: pointer;
    
}

.menu-grid {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    /* grid-template-rows: repeat(3, 100px); */
    gap: 10px;
    list-style: none;
    /* padding: 100px; */
    text-align: center;
    flex-wrap: wrap;
}

.modal-content{
    color: black;
}

</style>