import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue';
import SignUpView from '@/views/SignUpView.vue';
import LoginForm from '@/components/user/LoginForm.vue';

export default createRouter({
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
  }
],
})