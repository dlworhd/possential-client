import { createRouter, createWebHistory } from "vue-router";
import SignUpView from "@/views/SignUpView.vue";
import LoginForm from "@/components/user/LoginForm.vue";
import PosView from "@/views/PosView.vue";
import OrderHistoriesView from "@/views/OrderHistoriesView.vue";
import KakaoPaySuccess from "@/views/kakaopay/KakaoPaySuccess.vue";
import KakaoPayFailure from "@/views/kakaopay/KakaoPayFailure.vue";
import store from "@/store";
import PaymentView from "@/views/PaymentView.vue";
import NotFoundView from "@/views/error/NotFoundView.vue";
import CashView from "@/views/CashView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: PosView,
      meta: { requiresAuth: false },
    },
    {
      path: "/sign-up",
      component: SignUpView,
      meta: { requiresAuth: false },
    },
    {
      path: "/login",
      component: LoginForm,
      meta: { requiresAuth: false },
    },
    {
      path: "/cash",
      component: CashView,
      meta: { requiresAuth: true },
    },
    {
      path: "/orders",
      component: OrderHistoriesView,
      meta: { requiresAuth: true },
    },
    {
      path: "/payments",
      component: PaymentView,
      meta: { requiresAuth: true },
    },
    {
      path: "/pay/success",
      component: KakaoPaySuccess,
      meta: { requiresAuth: true },
    },
    {
      path: "/pay/failure",
      component: KakaoPayFailure,
      meta: { requiresAuth: true },
    },
    {
      path: "/:catchAll(.*)",
      component: NotFoundView,
    },
  ],
});
  
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.state.isLogin) {
    next("/login");
    from.path
  } else {
    next();
  }
});

export default router;
