import { createRouter, createWebHistory } from "vue-router";
import SignUpView from "@/views/SignUpView.vue";
import LoginForm from "@/components/user/LoginForm.vue";
import PosView from "@/views/PosView.vue";
import OrderHistoriesView from "@/views/OrderHistoriesView.vue";
<<<<<<< Updated upstream
import KakaoPaySuccess from "@/views/KakaoPaySuccess.vue";
import KakaoPayFail from "@/views/KakaoPayFail.vue";
import store from "@/store";
import NotFound from "@/components/common/NotFound.vue";
=======
import KakaoPaySuccess from "@/views/kakaopay/KakaoPaySuccess.vue";
import KakaoPayFail from "@/views/kakaopay/KakaoPayFail.vue";
import store from "@/store";
import NotFound from "@/components/common/NotFound.vue";
import PaymentView from "@/views/PaymentView.vue";
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream

    {
      path: "/orders",
      component: OrderHistoriesView,
      meta: { requiresAuth: true },
    },
    {
      path: "/pay/success",
      component: KakaoPaySuccess,
      meta: { requiresAuth: true },
    },
    {
      path: "/pay/fail",
      component: KakaoPayFail,
      meta: { requiresAuth: true },
    },
    {
      path: "/:catchAll(.*)",
      component: NotFound,
    },
  ],
});

=======
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
      path: "/pay/fail",
      component: KakaoPayFail,
      meta: { requiresAuth: true },
    },
    {
      path: "/:catchAll(.*)",
      component: NotFound,
    },
  ],
});

>>>>>>> Stashed changes
//Router Navigation Guard
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.state.isLogin) {
    next("/login");
  } else {
    next();
  }
});

export default router;
