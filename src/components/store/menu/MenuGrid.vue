<template>
    <div class="menu-grid-container">
        <div class="menu-grid">
            <button @click="addToCart(menu)" class="menu-item" v-for="menu in getMenuItems" :key="menu.menuId">
                <div class="menu-name">{{ menu.menuName }}</div>
                <div class="menu-price">{{ menu.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}원</div>
            </button>
            <button @click="openModal" v-for="i in 15 - menuItems.length" :key="'add-button-' + i" class="menu-item empty">
                +
            </button>
        </div>
    </div>

    <div class="btn-container">
    <div>
        <button class="page-btn" @click="previousPage">이전</button>
    </div>
    <div>
        <button class="page-btn" @click="nextPage">다음</button>
    </div>
    </div>
    <MenuRegistrationModal v-if="isModalVisible" @closeModal="closeModal" @fetchMenuList="fetchMenuList" />


</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapState, mapMutations, mapGetters } from 'vuex';
import instance from '@/plugin/CustomAxios';
import MenuRegistrationModal from './MenuRegistrationModal.vue';
import { Menu } from '../../../store/index';


export interface CartDetail {
    totalPrice: number
}

export default defineComponent({
    data(){
        // 데이터 초기화
        return {
            pageInfo: {},
            currentPage: 0,
            totalPages: 0,
            maxSize: 15,
            isModalVisible: false,
        }
    },
    //Component가 DOM에 마운트 된 후에 실행
    created() {
        //아이디를 기준으로 StoreMenu들을 가져옴
        this.fetchMenuList()
    },
    computed: {
        ...mapState(['cartItems', 'menuItems', 'storeId']),
        ...mapGetters(['getMenuItems'])
    },
    methods: {
        openModal() {
            this.isModalVisible = true;
        },
        closeModal() {
            this.isModalVisible = false;
        },
        hasAnyMenu(){
            return this.menuItems.length > 0
        },
        fetchMenuList() {
            instance.get(`/api/menu?size=${this.maxSize}&page=${this.currentPage}`)
            .then((response) => {
                this.$store.commit('setMenuItems', response.data.content)
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
        addCartItem(menu: Menu){
            this.addToCart(menu)
        },
    },
    components: {
        MenuRegistrationModal
    }
})   

</script>

<style scoped>

.btn-container {
    display: flex;
}

.menu-grid-container {
    margin-top: 8vh;
    display: flex;
    justify-content: center;
    align-items: center;
    /* height: 100vh; */
}
.menu-item {
    background-color: rgba(255, 255, 255, 0);
    color: rgb(255, 255, 255);
    width: 150px;
    height: 150px;
    border: 1px solid rgb(108, 183, 68);
    border-radius: 15px;
    cursor: pointer;
}

.menu-item:hover {
    
    transform: scale(1.1);
    
}


.menu-grid {

    display: grid;
    grid-template-columns: repeat(5, 150px);
    /* grid-template-rows: repeat(3, 100px); */
    gap: 10px;
    list-style: none;
    /* padding: 100px; */
    text-align: center;
    flex-wrap: wrap;
    justify-content: center;
    /* margin: 50px; */
}

.modal-content{
    color: black;
}

.menu-name {
    overflow: hidden;
    margin-bottom: 20px;
    font-size: 15px;

}

.btn-container{
    display: flex;
    /* justify-content: space-around; */
}

.page-btn {
    
    margin-top: 5vh;
    width: 5vh;
    height: 5vh;
    background: none;
    color: white;
    border: 1px solid rgb(108, 183, 68);
    /* border-radius: 15px; */
    /* padding: 20px 6px; */

}

.page-btn:hover {
    background-color: rgb(108, 183, 68);
}
</style>