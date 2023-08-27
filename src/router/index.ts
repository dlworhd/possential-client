import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue';
import SignUpView from '@/views/SignUpView.vue';
import LoginForm from '@/components/user/LoginForm.vue';
import PosView from '@/views/PosView.vue';
import OrderHistoriesView from '@/views/OrderHistoriesView.vue'
import KakaoPaySuccess from '@/views/KakaoPaySuccess.vue'
import KakaoPayFail from '@/views/KakaoPayFail.vue'
import { Store } from 'vuex';
import store from '@/store';

const router =  createRouter({
  history: createWebHistory(),
  routes: [{
    path: '/',
    component: HomeView
  },
  {
    path: '/sign-up',
    component: SignUpView
  },
  {
    path: '/login',
    component: LoginForm
  },
  {
    path: '/pos',
    component: PosView,
    meta: { requiresAuth: true },
  },
  {
    path: '/orders',
    component: OrderHistoriesView,
    meta: { requiresAuth: true },
  },
  {
    path: '/pay/success',
    component: KakaoPaySuccess,
    meta: { requiresAuth: true },
  },
  {
    path: '/pay/fail',
    component: KakaoPayFail,
    meta: { requiresAuth: true },
  },
  // {
  //   path: '/pay/success',
  //   component: OrderHistoriesView
  // }
],
})

router.beforeEach((to, from, next) => {
  if(to.meta.requiresAuth && !store.state.isLogin){
    next('/login')
  } else {
    next();
  }
})


export default router