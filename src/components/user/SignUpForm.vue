<template>
<form class="sign-up-form" @submit.prevent="register">
    <div class="sign-up-form__container">
        <div class="sign-up-form__input-group">
            <div class="sign-up-form__label">이메일</div>
            <input class="sign-up-form__text-input" v-model="user.email" type="email" placeholder="이메일"/>

            <div class="sign-up-form__label">패스워드</div>
            <input class="sign-up-form__text-input" v-model="user.password" type="password" placeholder="비밀번호"/>

            <div class="sign-up-form__label">이름</div>
            <input class="sign-up-form__text-input" v-model="user.name" type="text" placeholder="이름을 입력해주세요"/>

            <div class="sign-up-form__label">휴대폰 번호</div>
            <input class="sign-up-form__text-input" v-model="user.phoneNumber" type="text" placeholder="010 - 0000 - 0000"/>
            
            <div class="sign-up-form__label">생년월일</div>
            <input class="sign-up-form__date-input" type="date" v-model="user.birth"/>
        </div>

        <div class="sign-up-form__btn-group">
            <div class="sign-up-form__btn">
                <button class="sign-up-form__submit-btn btn" type="submit">가입</button>
            </div>
            <div class="sign-up-form__btn">
                <button class="sign-up-form__home-btn btn" to="/">홈 화면</button>
            </div>
        </div>
    </div>
</form>
    
</template>

<script lang="ts">
import instance from '@/plugin/CustomAxios';
import { defineComponent } from 'vue';

export default defineComponent({
    data(){
        return {
            user: 
            {
                email: "",
                password: "",
                name: "",
                phoneNumber: "",
                birth: ""
            }
        }
    },
    methods: {
        async register(){
            try {
                await instance.post(`/api/users`, this.user)
                .then(() => {
                    alert("회원가입을 축하합니다.")
                    this.$router.push('/')
                })
            } catch (error) {
                //Validation 처리 
            }
            
        }
    }
})

</script>

<style lang="scss" scoped>
@import '../../assets/variable.scss';
.sign-up-form  {
    margin-top: 20vh;
    display: flex;
    justify-content: center;
}

.sign-up-form__container {
    // display: flex;
    justify-content: center;
}

.sign-up-form__text-input {
    width: 300px;
    height: 30px;
    margin-bottom: 10px;
}
.sign-up-form__input-group {
    margin-bottom: 10px;
}
.btn {
    background-color: rgb(13, 201, 0);
    border: 1px solid black;
    color: white;
    width: 300px;
    height: 30px;   
}

.sign-up-form__label {
    color: white;
}


</style>

