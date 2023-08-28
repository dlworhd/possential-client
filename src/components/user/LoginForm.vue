<template>
    <form class="login-form" @submit.prevent="login">
        <div class="login-form__container">
            <div class="login-form__input-group">

                <div class="login-form__input">
                    <div class="login-form__label">이메일</div>
                    <input class="login-form__text-input" v-model="user.email" type="email" placeholder="이메일"/>
                </div>

                <div class="login-form__input">
                    <div class="login-form__label">패스워드</div>
                    <input class="login-form__text-input" v-model="user.password" type="password" placeholder="비밀번호"/>
                </div>

            </div>
        </div>
        <div class="login-form__btn-container">
            <div class="login-form__btn-group">
                <div class="login-form__btn">
                    <button type="submit" class="login-form__submit-btn btn">로그인</button>
                </div>
                <div class="login-form__btn">
                    <button class="login-form__home-btn btn" @click="handleHome">홈 화면</button>
                </div>
            </div>
        </div>
    </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import instance from '@/plugin/CustomAxios';
import { mapMutations } from 'vuex';

export default defineComponent({
    data(){
        return {
            user: 
            {
                email: "",
                password: "",
            }
        }
    },
    methods: {
        ...mapMutations(['setEmail','setStoreId']),
    
        handleHome(){
            this.$router.push('/')
        },
        async login(){
            try{
                await instance.post("/api/auth/login", this.user).then(response => {
                    if(response.status === 200){
                        const accessToken = response.data.value;
                        localStorage.setItem('accessToken', accessToken);
                        this.setLogin(true);
                        this.setEmail(this.user.email);
                        this.$router.push('/');
                    }
                })
            }catch(error){
                console.log(error);
            }
        },
        ...mapMutations(['setStoreId', 'setLogin'])
    }
})
</script>

<style lang="scss" scoped>
@import '../../assets/variable.scss';
.login-form  {
    padding-top: 20vh;
}

.login-form__container {
    /* margin-top: 20vh; */
    display: flex;
    justify-content: center;
}

.login-form__text-input {
    width: 300px;
    height: 30px;
    margin-bottom: 5px;
}

.login-form__btn-container {
    display: flex;
    justify-content: center;
    position: relative;
    top: 10px;
}

.login-form__submit-btn {
    margin-bottom: 1px;
}

.btn {
    background-color: rgb(13, 201, 0);
    border: 1px solid black;
    color: white;
    width: 300px;
    height: 30px;   
}

.login-form__label {
    color: white;
}


</style>