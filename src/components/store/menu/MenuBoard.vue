<template>
<div class="menu-board">
  <div v-if="isLogin" class="menu-board__grid-container">
    <div class="menu-board__grid">
      <button @click="addCartItem(menu)" v-for="menu in getMenuItems" :key="menu.menuId" class="menu-board__item" @mouseleave="handleMouseOut">
          <div class="menu-board__item-name">
            {{ menu.menuName }}
          </div>
          <div class="menu-board__item-price">
            {{ menu.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}원
          </div>
        <div class="menu-board__item-option-group">
          <div @click="handleButtonClick($event, menu)" class="menu-board__item-delete-btn">
            X
          </div>
          <div v-if="isEditMode" class="menu-board__item-edit-input-group">            
              <input class="menu-board__item-name-input" type="text" v-model="editedMenu.menuName" placeholder="메뉴 이름"/>
              <input class="menu-board__item-price-input" type="text" v-model="editedMenu.price" placeholder="메뉴 가격"/>
          </div>
        </div>
        <!-- display: none -> hover할 때 display: block -->
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

<script lang="ts">
import { defineComponent } from "vue";
import { mapState, mapMutations, mapGetters } from "vuex";
import instance from "@/plugin/CustomAxios";
import MenuRegistrationModal from "./MenuRegistrationModal.vue";
import axios from "axios";
import MenuBoardPage from "./MenuBoardPage.vue";

export interface Menu {
  menuId: number;
  menuName: string;
  price: number;
  quantity: number;
}

export default defineComponent({
  data() {
    // 데이터 초기화
    return {
      pageInfo: {},
      currentPage: 0,
      totalPages: 0,
      maxSize: 15,
      isModalVisible: false,
      isEditMode: false,
      editedMenu: {
        menuName: "",
        price: 0,
      },
      allEditMode: false
    };
  },
  //Component가 DOM에 마운트 된 후에 실행
  created() {
    //아이디를 기준으로 StoreMenu들을 가져옴
    this.fetchMenuList();
  },
  components: {
    MenuRegistrationModal,
    MenuBoardPage
  },
  computed: {
    ...mapState(["cartItems", "menuItems", 'isLogin']),
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
        await instance.put(`/api/menu/${menu.menuId}`, requestMenu).then(response => {
          if (response && response.status === 200) {
          this.fetchMenuList(); //menu리스트 초기화
          this.editedMenu = {
            menuName: '',
            price: 0,
          };
          alert('수정 완료');
        }
      })
     } catch (error) {
        console.log('error발생');
        
        if (
          axios.isAxiosError(error) &&
          error.response &&
          error.response.status === 400 &&
          error.response.data.message === 'DUPLICATED_MENU'
        ) {
          alert('중복된 메뉴 이름입니다.');
        } else {
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
        this.$store.commit('setMenuItems', response.data.content);
        this.currentPage = response.data.pageable.pageNumber;
        this.totalPages = response.data.totalPages;
      })
      .catch((error) => {
          if (error.code) console.log(error);
      });
      console.log('fetchMenuList종료');
      
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
        await instance.delete(`/api/menu/${menuId}`).then(response => {
          //Delete Item -> Fetch MenuList 순서의 보장을 위한 코드 작성
          this.fetchMenuList();
        }).catch(error => {
          console.log(error);
          
        })
      }catch(error){
        console.log(error);
        
      }
    },
    handleButtonClick(event: Event, menu: Menu) {
      event.stopPropagation(); // 이벤트 버블링 중지
      this.deleteItem(menu.menuId);
    },

    //mapMutations을 사용하여 'addCartItem' 뮤테이션을 컴포넌트에 매핑한다.
    //이렇게 매핑하면 this.addCartItem 메서드를 컴포넌트 내에서 사용할 수 있음
    ...mapMutations(['addCartItem']),
  },
});
</script>

<style lang='scss' scoped>
@import '../../../assets/variable.scss';

.notice {
  color: white;
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

.menu-board__item-option-group:hover .menu-board__item-delete-btn{
  display: block;
  position: absolute;
  top: 10px;
  right: 10px;
}

.menu-board__item-delete-btn {
  display: none;
}

.menu-board__item-delete-btn:hover {
  transform: scale(1.1);
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
  background-color: rgba(255, 255, 255, 0);
  color: rgb(255, 255, 255);
  width: 150px;
  height: 150px;
  border: 1px solid white;
  border-radius: 15px;
  cursor: pointer;
}

.menu-board__item:hover {
  transform: scale(1.1);
  transition-duration: 100ms;
}

.menu-board__grid {
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

.menu-board__item-name {

  margin-bottom: 20px;
  font-size: 15px;
  word-wrap: normal;
}

.menu-board {
    width: 75vw;
    padding-top: 5vh;
    border-left: 1px solid white;
    border-bottom: 1px solid white;
    box-sizing: border-box;
}
</style>
