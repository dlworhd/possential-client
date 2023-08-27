import { createStore } from "vuex";

import instance from "../plugin/CustomAxios";
import { CartDetail } from "@/components/store/menu/MenuGrid.vue";

const BASE_URL = "http://localhost:8080";

interface State {
  email: string;
  menuItems: Menu[];
  cartItems: Menu[];
  cartDetail: CartDetail;
  orderType: string;
  paymentType: string;
  isLogin: boolean;
}

export interface Menu {
  menuId: number;
  menuName: string;
  price: number;
  quantity: number;
}

/**
 * 1. Menu Item 클릭
 * 2. Store에서 관리하는 state의 cartItem에 담김 즉, 관리하고자 하는 것들을 state에 담고, Mutation을 통해서 상태를 관리하는 것임
 * 3. 다만, Mutation을 직접 호출하는 건 안 되고, Actions를 만들어서 데이터를 변경한다.
 * 4. 그리고 나서 데이터에 접근할 때 getter을 쓰면 됨
 */

// commit을 사용할 때 뮤테이션 이름과, 추가 인자를 넣어주면 해당 뮤테이션이 실행이 되면서 상태가 변경이 되는 것. 즉, mutation은 상태를 변경하는 유일한 방법이라는 것의 방증
export default createStore({
  state: {
    email: "",
    menuItems: [] as State["menuItems"],
    cartItems: [] as State["cartItems"], //cartItems를 빈 배열([])로 초기화한다 후 as 키워드를 사용하여 해당 빈 배열을 State 인터페이스에서 정의한 cartItems 속성의 타입인 Menu[]로 타입 캐스팅
    cartDetail: {
      totalPrice: 0,
    },
    orderType: "IN",
    paymentType: "CASH",
    isLogin: false,
  },
  mutations: {
    RESET_STATE(state: State) {
      state.email = "",
      state.menuItems = [] as State["menuItems"],
      state.cartItems = [] as State["cartItems"], //cartItems를 빈 배열([])로 초기화한다 후 as 키워드를 사용하여 해당 빈 배열을 State 인터페이스에서 정의한 cartItems 속성의 타입인 Menu[]로 타입 캐스팅
      state.cartDetail = {
        totalPrice: 0,
      },
      state.orderType = "IN",
      state.paymentType = "CASH",
      state.isLogin = false

      console.log('mutation실행');

      
    },
    setEmail(state: State, email: string) {
      state.email = email;
    },
    // Mutation은 상태를 변경하는 유일한 방법
    setMenuItems(state: State, menuList: Menu[]) {
      state.menuItems = menuList;
    },
    //Cart 모듈로 분리
    addToCart(state: State, menuItem: Menu) {
      const existingItem = state.cartItems.find(
        (item) => item.menuId === menuItem.menuId
      );
      if (!existingItem) {
        state.cartItems.push(menuItem);
        menuItem.quantity = 1;
        state.cartDetail.totalPrice =
          state.cartDetail.totalPrice.valueOf() + menuItem.price;
      } else {
        menuItem.quantity++;
        state.cartDetail.totalPrice =
          state.cartDetail.totalPrice.valueOf() + menuItem.price;
      }
    },
    increaseQuantity(state: State, menuId: number) {
      const menuItem = state.cartItems.find((item) => item.menuId === menuId);
      if (menuItem) {
        menuItem.quantity++;
        state.cartDetail.totalPrice =
          state.cartDetail.totalPrice.valueOf() + menuItem.price;
      }
    },
    decreaseQuantity(state: State, menuId: number) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.menuId === menuId
      );
      if (itemIndex != -1) {
        const item = state.cartItems[itemIndex];
        if (item.quantity > 0) {
          item.quantity--;
          if (item.quantity === 0) {
            state.cartItems.splice(itemIndex, 1); // itemIndex에서 1개 제거
          }
          state.cartDetail.totalPrice =
            state.cartDetail.totalPrice.valueOf() - item.price;
        }
      }
    },
    setOrderType(state, option: string) {
      state.orderType = option;
    },
    setPaymentType(state, option: string) {
      state.paymentType = option;
    },
    setLogin(state: State, isLogin: boolean) {
      state.isLogin = isLogin;
    },
    setCartItems(state: State, menuList: Menu[]) {
      state.cartItems = menuList;
    },
  },
  actions: {
    // 비동기 작업 처리 및 여러 번의 Mutation 실행 가능 -> 주로 비동기 작업 및 데이터 가져오기
    //Cart 모듈로 분리
    addToCartAction(context: any, menuItem: Menu) {
      context.commit("addToCart", menuItem);
    },
    increaseQuantityAction({ commit }, menu: Menu) {
      commit("increaseQuantity", menu.menuId);
    },
    decreaseQuantityAction({ commit }, menu: Menu) {
      commit("decreaseQuantity", menu.menuId);
    },
    updateOrderType({ commit }, option: string) {
      commit("setOrderType", option);
    },
    updatePaymentType({ commit }, option: string) {
      commit("setPaymentType", option);
    },
    setStoreIdAction({ commit }, storeId: string) {
      console.log(`setStoreId 실행 = ${storeId}`);
      commit("setStoreId", storeId);
    },
    fetchMenuListAction({ commit }, menuList: Menu[]) {
      commit("fetchMenuList", menuList);
    },
    //Order 모듈로 분리
    async sendOrder({ state }) {
      try {
        const cartItems: { [id: number]: number } = {};
        state.cartItems.forEach((menu) => {
          cartItems[menu.menuId] = menu.quantity;
        });
        const data = {
          cartItems: cartItems,
          orderType: state.orderType,
          paymentType: state.paymentType,
        };
        const response = await instance.post(`${BASE_URL}/api/orders`, data);
        if (response.data.next_redirect_pc_url != null) {
          const redirectUrl = response.data.next_redirect_pc_url;
          window.open(redirectUrl, "_blank");
        }

        state.cartItems = [];
        state.cartDetail.totalPrice = 0;
        console.log(response.data);
      } catch {
        console.log("error");
      }
    },
  },

  getters: {
    // 상태 저장소의 데이터를 계산된 속성 형태로 제공하는 메서드이다.

    //Cart 모듈로 분리
    getCartItems(state: State) {
      return state.cartItems;
    },
    getTotalPrice(state: State) {
      return state.cartDetail.totalPrice;
    },
    getOrderType(state: State) {
      return state.orderType;
    },
    getPaymentType(state: State) {
      return state.orderType;
    },
    //Menu 모듈로 분리
    getMenuItems(state: State): Menu[] {
      return state.menuItems;
    },
    getIsLogin(state: State) {
      return state.isLogin;
    },
  },
});
