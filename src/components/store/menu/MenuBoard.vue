<template>
<div class="menu-board">
  <div v-if="isLogin" class="menu-board__grid-container">
    <div class="menu-board__grid">
      <button @click="addCartItem(menu)" v-for="menu in getMenuItems" :key="menu.menuId" class="menu-board__item" @mouseleave="handleMouseOut">
        <div class="menu-board__item-option-group">
          <img @click="handleButtonClick($event, menu)" class="menu-board__item-x-btn" src="../../../assets/x-btn.svg">
          <div v-if="isEditMode" class="menu-board__item-edit-input-group">            
              <input class="menu-board__item-name-input" type="text" v-model="editedMenu.menuName" placeholder="메뉴 이름"/>
              <input class="menu-board__item-price-input" type="text" v-model="editedMenu.price" placeholder="메뉴 가격"/>
          </div>
        </div>
        <div class="menu-board__item-name">
          {{ menu.menuName }}
        </div>
        <div class="menu-board__item-price">
          {{ menu.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}원
        </div>
        
      </button>
      <button @click="openModal" v-for="i in 15 - menuItems.length" :key="'add-button-' + i" class="menu-board__item">
        +
      </button>
    </div>
  </div>
  <MenuBoardPage v-if="isLogin" @fetchMenuList="fetchMenuList" @previousPage="previousPage" @nextPage="nextPage" :currentPage="currentPage" :totalPages="totalPages"/>  
  <MenuRegistrationModal v-if="isModalVisible" :currentPage="currentPage" :totalPages="totalPages" @closeModal="closeModal" @fetchMenuList="fetchMenuList"/>
  
  <div class="notice" v-if="!isLogin">
    <div><router-link to="/login">로그인이 필요합니다.</router-link></div>
  </div>
</div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import { mapState, mapMutations, mapGetters } from 'vuex';
import instance from '@/plugin/CustomAxios';
import MenuRegistrationModal from './MenuRegistrationModal.vue';
import axios, { AxiosResponse } from 'axios';
import MenuBoardPage from './MenuBoardPage.vue';
import store from '@/store';

export interface Menu {
  menuId: number;
  menuName: string;
  price: number;
  quantity: number;
}

export default defineComponent({
  data() {
    return {
      pageInfo: {},
      currentPage: 0,
      totalPages: 0,
      maxSize: 15,
      isModalVisible: false,
      isEditMode: false,
      editedMenu: {
        menuName: '',
        price: 0,
      },
      allEditMode: false
    };
  },
  created() {
    this.fetchMenuList();
  },
  components: {
    MenuRegistrationModal,
    MenuBoardPage
  },
  computed: {
    ...mapState(['cartItems', 'menuItems', 'isLogin']),
    ...mapGetters(['getMenuItems', 'getCartItems']),
  },
  methods: {
    onEditMode(){
      this.allEditMode = true;
    },
    offEditMode(){
      this.allEditMode = false;
    },
    
    handleMouseOut() {
      this.isEditMode = false;
      this.editedMenu = {
        menuName: '',
        price: 0,
      }
    },
    menuEditCancel() {
      this.editedMenu = {
        menuName: '',
        price: 0,
      };
      this.isEditMode = false;
    },
    async menuEdit(menu: Menu) {
      const requestMenu = {
        menuName: this.editedMenu.menuName,
        price: this.editedMenu.price,
      };

      try {
        await instance.put(`/api/menu/${menu.menuId}`, requestMenu).then((response: AxiosResponse) => {
          if (response && response.status === 200) {
            this.fetchMenuList();
            this.editedMenu = {
              menuName: '',
              price: 0,
            };
            alert('수정 완료');
        }
      })
     } catch (error) {
        if (
          axios.isAxiosError(error) &&
          error.response &&
          error.response.status === 400 &&
          error.response.data.message === 'DUPLICATED_MENU'
        ) {
          alert('중복된 메뉴 이름입니다.');
        }
        this.editedMenu = {
          menuName: '',
          price: 0,
        };
      }
    },
    async fetchMenuList() {
      await instance.get(`/api/menu?size=${this.maxSize}&page=${this.currentPage}`).then((response) => {
        store.commit('setMenuItems', response.data.content);
        this.currentPage = response.data.pageable.pageNumber;
        this.totalPages = response.data.totalPages;
      })
      .catch((error) => {
          if (error.code) console.log(error);
      });
    },
    openEditModal() {
      this.isEditMode = true;
    },
    openModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    hasAnyMenu() {
      return this.menuItems.length > 0;
    },
    previousPage() {
      if (this.currentPage > 0) {
          this.currentPage -= 1;

          this.fetchMenuList();
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
          this.currentPage += 1;
          this.fetchMenuList();
      }
    },
    async deleteItem(menuId: number){
      try{
        await instance.delete(`/api/menu/${menuId}`).then(() => {
          this.fetchMenuList();
        }).catch(error => {
          console.log(error);
        })
      }catch(error){
        console.log(error);
        
      }
    },
    handleButtonClick(event: Event, menu: Menu) {
      event.stopPropagation();
      this.deleteItem(menu.menuId);
    },
    ...mapMutations(['addCartItem']),
  },
});
</script>

<style lang='scss' scoped>
@import '../../../assets/variable.scss';

.notice {
  color: black;
  display: flex;
  height: 70vh;
  justify-content: center;
  align-items: center;
  text-decoration: none;
}

.notice a {
  color: white;
}

.menu-board__item-option-group {
  width: 150px;
  height: 150px;
  text-align: center;
  border-radius: 15px;
  position: absolute;
  top: 0;
  right: 0;
}

.menu-board__item-option-group:hover .menu-board__item-x-btn {
  display: inline;
  position: absolute;
  top: 10px;
  right: 10px;
}

.menu-board__grid-container {
  position: relative;
  margin-top: 8vh;
  display: flex;
  justify-content: center;
  /* align-items: center; */
  /* height: 100vh; */
}
.menu-board__item {

  color: rgb(255, 255, 255);
  width: 150px;
  height: 150px;
  background: rgba(255, 255, 255, 0.2);
  border: 0.5px solid rgba(255, 255, 255, 0.2);
  padding: 20px; 
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  position: relative;
  border-radius: 15px;
  cursor: pointer;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: inherit;
    border-radius: 15px;
    transform: blur(10px); /* 블러 효과 적용 */
    opacity: 0.7; /* 투명도 조정 */
    z-index: -1; /* 가상 요소를 내용 뒤로 이동 */
  }
}

.menu-board__item:hover {
  transform: scale(1.05);
  transition-duration: 100ms;
}

.menu-board__grid {
  display: grid;
  grid-template-columns: repeat(5, 150px);
  gap: 10px;
  list-style: none;
  text-align: center;
  flex-wrap: wrap;
  justify-content: center;
  border-radius: 15px;
}

.menu-board__item-name {
  margin-bottom: 20px;
  font-size: 15px;
  word-wrap: normal;
}

.menu-board {
    width: 75vw;
    padding-top: 5vh;
    border-left: 0.5px solid white;
    border-bottom: 0.5px solid white;
    box-sizing: border-box;
}

.menu-board__item-x-btn {
  display: none;
  width: 10%;
}

.menu-board__item-x-btn:hover {
  transform: scale(1.1);
}
</style>
