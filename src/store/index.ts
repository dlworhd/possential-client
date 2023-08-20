import { createStore } from 'vuex';
import { Menu, CartDetail } from '../components/menu/MenuItem.vue'; 
import { createEmitAndSemanticDiagnosticsBuilderProgram } from 'typescript';

interface State{
    cartItems: Menu[]
    cartDetail: CartDetail
}

/**
 * 1. Menu Item 클릭
 * 2. 
 * 
 * 
 */

// commit을 사용할 때 뮤테이션 이름과, 추가 인자를 넣어주면 해당 뮤테이션이 실행이 되면서 상태가 변경이 되는 것. 즉, mutation은 상태를 변경하는 유일한 방법이라는 것의 방증
export default createStore({
    state:{
        cartItems: [] as State['cartItems'], //cartItems를 빈 배열([])로 초기화한다 후 as 키워드를 사용하여 해당 빈 배열을 State 인터페이스에서 정의한 cartItems 속성의 타입인 Menu[]로 타입 캐스팅
        cartDetail: {
            totalPrice: 0
        }
    },
    mutations: { // Mutation은 상태를 변경하는 유일한 방법
        addToCart(state: State, menuItem: Menu){

            const existingItem = state.cartItems.find((item) => item.menuId === menuItem.menuId)
            if(!existingItem){
                state.cartItems.push(menuItem);
                menuItem.quantity = 1
                state.cartDetail.totalPrice += menuItem.price
            } else {
                menuItem.quantity++
                state.cartDetail.totalPrice += menuItem.price
            }
            
        },
        increaseQuantity(state: State, menuId: number){
            const menuItem = state.cartItems.find(item => item.menuId === menuId);
            if(menuItem){
                menuItem.quantity++
                state.cartDetail.totalPrice += menuItem.price
            }
        },
        decreaseQuantity(state: State, menuId: number){
            const itemIndex = state.cartItems.findIndex(item => item.menuId === menuId);
            if(itemIndex != -1){
                const item = state.cartItems[itemIndex]
                if(item.quantity > 0 ){
                    item.quantity--
                    if(item.quantity === 0){
                        state.cartItems.splice(itemIndex, 1) // itemIndex에서 1개 제거
                    }
                    state.cartDetail.totalPrice -= item.price
                }
            }
        }

    },
    actions: { // 비동기 작업 처리 및 여러 번의 Mutation 실행 가능 -> 주로 비동기 작업 및 데이터 가져오기
        addToCartAction(context: any, menuItem: Menu){
            context.commit('addToCart', menuItem)
        },
        increaseQuantityAction({ commit, state }, menu: Menu) {
            commit('increaseQuantity', menu.menuId)
        },
        decreaseQuantityAction({ commit, state }, menu: Menu) {
            commit('decreaseQuantity', menu.menuId)
        }
    },
    getters: { // 상태 저장소의 데이터를 계산된 속성 형태로 제공하는 메서드이다.
        getCartItems(state: State){
            return state.cartItems;
        },
        getTotalPrice(state: State){
            return state.cartDetail.totalPrice;
        }
    }

})  