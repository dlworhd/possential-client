import { createStore } from 'vuex';
import instance from '../plugin/CustomAxios';

const BASE_URL = 'http://localhost:8080';

interface State {
  storeId: string;
  email: string;
  menuItems: Menu[];
  cartItems: Menu[];
  totalPrice: number
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
    storeId: '',
    email: '',
    menuItems: [] as State['menuItems'],
    cartItems: [] as State['cartItems'], //cartItems를 빈 배열([])로 초기화한다 후 as 키워드를 사용하여 해당 빈 배열을 State 인터페이스에서 정의한 cartItems 속성의 타입인 Menu[]로 타입 캐스팅
    totalPrice: 0,
    orderType: 'IN',
    paymentType: 'CASH',
    isLogin: false,
  },
  mutations: {
    RESET_STATE(state: State) {
      state.email = '',
      state.menuItems = [] as State['menuItems'],
      state.cartItems = [] as State['cartItems'], //cartItems를 빈 배열([])로 초기화한다 후 as 키워드를 사용하여 해당 빈 배열을 State 인터페이스에서 정의한 cartItems 속성의 타입인 Menu[]로 타입 캐스팅
      state.orderType = 'IN',
      state.paymentType = 'CASH',
      state.isLogin = false
    },
    //User Mutaions
    setEmail(state: State, email: string) {
      state.email = email;
    },
    setLogin(state: State, isLogin: boolean) {
      state.isLogin = isLogin;
    },
    //Menu Mutaions
    setMenuItems(state: State, menuList: Menu[]) {
      state.menuItems = menuList;
    },
    //Order Mutations
    setOrderType(state, option: string) {
      state.orderType = option;
    },
    //Payment Mutaions
    setPaymentType(state, option: string) {
      state.paymentType = option;
    },
    // Cart Mutaions
    setCartItems(state: State, menuList: Menu[]) {
      state.cartItems = menuList;
    },
    addCartItem(state: State, menuItem: Menu) {
      const existingItem = state.cartItems.find(
        (item) => item.menuId === menuItem.menuId
      );
      if (!existingItem) {
        state.cartItems.push(menuItem);
        menuItem.quantity = 1;
        state.totalPrice =
          state.totalPrice.valueOf() + menuItem.price;
      } else {
        menuItem.quantity++;
        state.totalPrice =
          state.totalPrice.valueOf() + menuItem.price;
      }
    },
    increaseQuantity(state: State, menuId: number) {
      const menuItem = state.cartItems.find((item) => item.menuId === menuId);
      if (menuItem) {
        menuItem.quantity++;
        state.totalPrice =
          state.totalPrice.valueOf() + menuItem.price;
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
          state.totalPrice =
            state.totalPrice.valueOf() - item.price;
        }
      }
    },
  },
  actions: {
    //Cart Actions
    increaseQuantityAction({ commit }, menu: Menu) {
      commit('increaseQuantity', menu.menuId);
    },
    decreaseQuantityAction({ commit }, menu: Menu) {
      commit('decreaseQuantity', menu.menuId);
    },
    //Order Actions
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
          window.open(redirectUrl, '_blank');
        }

        state.cartItems = [];
        state.totalPrice = 0;
        console.log(response.data);
      } catch {
        console.log('error');
      }
    },
  },

  getters: {
    // 상태 저장소의 데이터를 계산된 속성 형태로 제공하는 메서드이다.

    //Cart Getters
    getCartItems(state: State): Menu[] {
      return state.cartItems;
    },
    getTotalPrice(state: State) {
      let sum = 0;
      state.cartItems.forEach(x => sum += (x.price * x.quantity))
      return sum;
    },
    //Menu 모듈로 분리
    getMenuItems(state: State): Menu[] {
      return state.menuItems;
    },
  },
});
