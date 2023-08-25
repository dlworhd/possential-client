<template>
<form @submit.prevent="register">
    <div class="container">
        <div class="inner-container">
            <p>Email</p>
            <input class="text-input" v-model="user.email" type="email" placeholder="이메일"/>

            <p>PW</p>
            <input class="text-input" v-model="user.password" type="password" placeholder="비밀번호"/>

            <p>이름</p>
            <input class="text-input" v-model="user.name" type="text" placeholder="이름을 입력해주세요"/>

            <p>휴대폰 번호</p>
            <input class="text-input" v-model="user.phoneNumber" type="text" placeholder="010 - 0000 - 0000"/>

            <p>생년월일</p>
            <div class="detail">
                <input type="date" v-model="user.birth"/>
                <div>
                    <span>남</span><input v-model="user.gender" type="radio" value="MAN"/>
                    <span>여</span><input v-model="user.gender" type="radio" value="WOMAN"/>
                </div>
            </div>
        </div>
    </div>
    <div class="btn-container">
        <div>
            <div>
                <button type="submit" class="btn register">가입</button>
            </div>
            <div>
                <button class="btn home">홈으로</button>
            </div>
        </div>
    </div>
</form>
    
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';

export default defineComponent({
    data(){
        return {
            user: 
            {
                email: "",
                password: "",
                name: "",
                phoneNumber: "",
                gender: "",
                birth: ""
            }
        }
    },
    methods: {
        async register(){
            console.log(this.user.gender)
            try {
                await axios.post('http://localhost:8080/api/users', this.user)
                .then(response => {
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

<style scoped>

button {
    margin: 0;
    border: 0;
    padding: 0;
}

.register {
    color: white;
    background-color: rgb(13, 201, 0);
    margin-bottom: 5px;
}

.btn {
    width: 300px;
    height: 30px;
}

.inner-container {
    width: 300px;
}

input {
    padding: 0;
    border: 0;
}



.btn-container {
    margin-top: 20px;
    display: flex;
    justify-content: center;
}

.text-input {
    padding: 0 6px;
    width: 100%;
    height: 30px;
}

.container {
    display: flex;
    justify-content: center;
    margin-top: 50px;
}

.detail {
    display: flex;
    justify-content: space-between;
}

p {
    color: white;
}

span {
    color: white;
}
</style>

