<template>
  <div v-if="isLogin" class="menu-grid-container">
    <div class="menu-grid">
      <button class="menu-item" v-for="menu in getMenuItems" :key="menu.menuId">
        <div class="item-name">
          {{ menu.menuName }}
          <div></div>
        </div>
        <div class="item-price">
          {{ menu.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}원
        </div>
        <div class="options" @mouseleave="handleMouseOut" @click="addCartItem(menu)">
          <div class="delete-btn">
            X
          </div>
          <!-- 담기 이미지 -->
          <div v-if="!isEditMode" class="option add">
            <img
            src="../../../assets/add.svg"
            v-if="!isEditMode"
            class="add"

          />
          </div>
          <div class="edit-container">
            <div v-if="isEditMode" class="edit-item-name">
              <input
                type="text"
                v-model="editedMenu.menuName"
                placeholder="메뉴 이름"
              />
            </div>
            <div v-if="isEditMode" class="edit-item-price">
              <input
                type="text"
                v-model="editedMenu.price"
                placeholder="메뉴 가격"
              />
            </div>
            <div>
              <div v-if="isEditMode" class="menu-edit" @click="menuEdit(menu)">
                등록
              </div>
              <div
                v-if="isEditMode"
                class="menu-edit-cancel"
                @click="menuEditCancel"
              >
                취소
              </div>
            </div>
          </div>
        </div>
      </button>
      <button
        @click="openModal"
        v-for="i in 15 - menuItems.length"
        :key="'add-button-' + i"
        class="menu-item empty"
      >
        +
      </button>
    </div>
    
  </div>
  <div v-if="isLogin" class="btn-container">
    <div>
      <button v-if="!(currentPage == 0)" class="page-btn" @click="previousPage">
        이전
      </button>
    </div>
    <div>
      <button
        v-if="!(currentPage == totalPages)"
        class="page-btn"
        @click="nextPage"
      >
        다음
      </button>
    </div>
  </div>

  <MenuRegistrationModal
    v-if="isModalVisible"
    @closeModal="closeModal"
    @fetchMenuList="fetchMenuList"
  />

  <div class="notice" v-if="!isLogin">
    <div><router-link to="/login">로그인이 필요합니다.</router-link></div>
  </div>

</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapState, mapMutations, mapGetters } from "vuex";
import instance from "@/plugin/CustomAxios";
import MenuRegistrationModal from "./MenuRegistrationModal.vue";
import { Menu } from "../../../store/index";
import axios from "axios";

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
  computed: {
    ...mapState(["cartItems", "menuItems", "storeId", "isLogin"]),
    ...mapGetters(["getMenuItems", "getCartItems"]),
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
        menuName: "",
        price: 0,
      }
    },
    menuEditCancel() {
      this.editedMenu = {
        menuName: "",
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
          alert("수정 완료");
        }
      })
     } catch (error) {
        console.log('error발생');
        
        if (
          axios.isAxiosError(error) &&
          error.response &&
          error.response.status === 400 &&
          error.response.data.message === "DUPLICATED_MENU"
        ) {
          alert("중복된 메뉴 이름입니다.");
        } else {
          alert("중복된 메뉴 이름입니다.");
        }
        this.editedMenu = {
          menuName: "",
          price: 0,
        };
      }
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
    fetchMenuList() {
      instance
        .get(`/api/menu?size=${this.maxSize}&page=${this.currentPage}`)
        .then((response) => {
          this.$store.commit("setMenuItems", response.data.content);
          this.currentPage = response.data.pageable.pageNumber;
          this.totalPages = response.data.totalPages;
        })
        .catch((error) => {
          if (error.code) console.log(error);
        });
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
    //mapMutations을 사용하여 'addCartItem' 뮤테이션을 컴포넌트에 매핑한다.
    //이렇게 매핑하면 this.addCartItem 메서드를 컴포넌트 내에서 사용할 수 있음
    ...mapMutations(["addCartItem"]),
  },
  components: {
    MenuRegistrationModal,
  },
});
</script>

<style lang="scss" scoped>
@import "../../../assets/variable.scss";

.notice {
  color: $main--color;
  display: flex;
  height: 70vh;
  justify-content: center;
  align-items: center;
}

.notice a {
  color: $main--color;
  text-decoration: none;
}
.edit-container {
  position: absolute;
  top: 30%;
}
.options {
  display: none;
  top: 0;
  width: 150px;
  height: 150px;
  text-align: center;
  border-radius: 15px;
  // background-color: rgba(0, 0, 0, 0.637);
}

.add {
  position: relative;
  width: 100%;
  height: 100%;
  cursor: pointer;
}
.remove {
  position: relative;
  cursor: pointer;
  top: 30%;
  left: 10%;
}

.edit {
  position: absolute;
  width: 100%;
  height: 100%;
  // top: 40%;
  
  cursor: pointer;
}


.option {
  width: 30px;
  // height: 10px;
}
.option:hover {
  color: rgb(18, 98, 0);
  transition-duration: 400ms;
}


.edit:hover {
  transform: scale(1.3);
}

.menu-item:hover .options {
  position: absolute;
  /* top: 50%; */
  display: flex;
  justify-content: center;
  align-items: center;
}

.btn-container {
  display: flex;
}

.menu-grid-container {
  position: relative;
  margin-top: 8vh;
  display: flex;
  justify-content: center;
  /* align-items: center; */
  /* height: 100vh; */
}
.menu-item {
  background-color: rgba(255, 255, 255, 0);
  color: rgb(255, 255, 255);
  width: 150px;
  height: 150px;
  border: 1px solid $main--color;
  border-radius: 15px;
  cursor: pointer;
  position: relative;
}

.menu-item:hover {
  transform: scale(1.1);
  transition-duration: 200ms;
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

.modal-content {
  color: black;
}

.item-name {
  overflow: hidden;
  margin-bottom: 20px;
  font-size: 15px;
  word-wrap: normal;
}

.btn-container {
  display: flex;
  /* justify-content: space-around; */
  margin-top: 5vh;
}

.page-btn {
  width: 5vh;
  height: 5vh;
  background: none;
  color: white;
  cursor: pointer;
  /* border: 1px solid $main--color */
  /* border-radius: 15px; */
  /* padding: 20px 6px; */

  margin: 0 10px;
}

.page-btn:hover {
  background-color: $main--color;
}

.delete-btn {
  color: $main--color;
  position: absolute;
  top: 10%;
  right: 10%;
}
.delete-btn:hover { 
  transform: scale(1.3);
  transition-duration: 300ms;
}
</style>
