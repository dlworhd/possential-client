import { createStore } from 'vuex/types/index.js';
import { Menu } from '../components/NewMenuComponent.vue'; 

interface State{
    cartItems: Menu[]
}

/**
 * 1. Menu Item 클릭
 * 2. 
 * 
 * 
 */

export default createStore({
    state:{
        cartItems: [] as State['cartItems'], //cartItems를 빈 배열([])로 초기화한다 후 as 키워드를 사용하여 해당 빈 배열을 State 인터페이스에서 정의한 cartItems 속성의 타입인 Menu[]로 타입 캐스팅
    },
    mutations: { // Mutation은 상태를 변경하는 유일한 방법
        addToCart(state: State, newItem: Menu){
            state.cartItems.push(newItem);
        }
    },
    actions: { // 비동기 작업 처리 및 여러 번의 Mutation 실행 가능 -> 주로 비동기 작업 및 데이터 가져오기
        addToCartAction(context: any, newItem: Menu){
            context.commit('addToCart', newItem)
        }
    },
    getters: { // 상태 저장소의 데이터를 계산된 속성 형태로 제공하는 메서드이다.
        getCartItem(state: State){
            return state.cartItems;
        }
    }

})  