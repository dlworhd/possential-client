<template>
<form class="sign-up-form" @submit.prevent="register">
    <div class="sign-up-form__container">
        <div class="sign-up-form__input-group">
            <div class="sign-up-form__label">이메일</div>
            <input class="sign-up-form__text-input" v-model="user.email" type="text" placeholder="이메일 형식으로 입력해주세요."/>
            <div class="sign-up-form__error-message" v-if="!isEmailValid">올바른 이메일 주소를 입력하세요.</div>
            
            <div class="sign-up-form__label">패스워드</div>
            <input class="sign-up-form__text-input" v-model="user.password" type="password" placeholder="영문 대소문자, 숫자, 특수 문자 포함 8자 이상"/>
            <div class="sign-up-form__error-message" v-if="!isPasswordValid">올바른 패스워드를 입력하세요.</div>

            <div class="sign-up-form__label">이름</div>
            <input class="sign-up-form__text-input" v-model="user.name" type="text" placeholder=""/>

            <div class="sign-up-form__label">휴대폰 번호</div>
            <input class="sign-up-form__text-input" v-model="user.phoneNumber" type="text" placeholder="010-0000-0000"/>
            <div class="sign-up-form__error-message" v-if="!isPhoneNumberValid">올바른 휴대폰 번호를 입력하세요.</div>
            
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

<script lang='ts'>
import instance from '@/plugin/CustomAxios';
import { defineComponent } from 'vue';


export default defineComponent({
    data(){
        return {
            user: 
            {
                email: '',
                password: '',
                name: '',
                phoneNumber: '',
                birth: ''
            },
            isEmailValid: true,
            isPasswordValid: true,
            isPhoneNumberValid: true,
        }
    },
    methods: {
        async register(){
            this.validateForm()
            if (this.isEmailValid && this.isPasswordValid && this.isPhoneNumberValid) {
                try {
                await instance.post(`/api/users`, this.user)
                .then(() => {
                    alert('회원가입을 축하합니다.')
                    this.$router.push('/')
                })
                } catch (error) {
                    //Validation 처리 
                }
            } else {
                console.log('폼 검증 실패');
            }
        },
        validateForm(){
            const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
            this.isEmailValid = emailRegex.test(this.user.email);
            
            // 패스워드 유효성 검사 (8자 이상, 영문 대소문자, 숫자, 특수 문자 포함)
            const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            this.isPasswordValid = passwordRegex.test(this.user.password);
            
            // 휴대폰 번호 유효성 검사 (xxx-xxxx-xxxx 형식)
            const phoneRegex = /^\d{3}-\d{4}-\d{4}$/;
            this.isPhoneNumberValid = phoneRegex.test(this.user.phoneNumber);
        }
    },

})
</script>

<style lang='scss' scoped>
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

.sign-up-form__error-message {
    color: rgb(173, 70, 70);
    font-size: small;
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