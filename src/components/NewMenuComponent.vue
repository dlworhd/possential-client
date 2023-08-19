<template>
    <div class="menu-grid">
    <li class="menu" v-for="(menu, menuId) in menuList" :key="menuId">
    {{ menu.menuName }}
    {{ menu.price }}
    </li>

    <button @click="previousPage">이전</button>
    <button @click="nextPage">다음</button>
</div>
</template>

<script lang="ts">
import axios from 'axios';
import { defineComponent } from 'vue'

export interface MenuList {
    menuId: String,
    menuName: String
    price: Number
}

//임시 스토어 아이디
const storeId = "09efa9fe-79d9-4f11-a3bd-9507c24aab5b"

export default defineComponent({
    data(){
        return {
            menuList: [] as MenuList[],
            pageInfo: {},
            currentPage: 0,
            totalPages: 0,
            maxSize: 12
        }
    },
    mounted() {
        this.fetchMenuList();
    },
    methods: {
        fetchMenuList() {
            axios.get(`/api/stores/${storeId}/menu?size=${this.maxSize}&page=${this.currentPage}`)
            .then((response) => {
                this.menuList = response.data.content
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