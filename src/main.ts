import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '../src/assets/main.scss'

createApp(App).use(store).use(router).mount('#app')

function checkAccessToken() {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      store.commit('setLogin', true); // isLogin을 true로 설정
    }
}

checkAccessToken();