<template>
    <form @submit.prevent="login">
        <div class="container">
            <div>
            <div>
                <p>Email</p>
                <input class="text-input" v-model="user.email" type="email" placeholder="이메일"/>
            </div>
            <div>
                <p>PW</p>
                <input class="text-input" v-model="user.password" type="password" placeholder="비밀번호"/>
            </div>
            </div>
        </div>
        <div class="btn-container">
            <div>
                <div>
                    <button type="submit" class="btn login">로그인</button>
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

interface Token{
    grantType: string,
    accessToken: string,
    refreshToken: string
}

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
        async login(){
            try{
                await axios.post("http://localhost:8080/api/auth/login", this.user).then(response => {
                    console.log(response.data)
                    const { grantType, accessToken, refreshToken } = response.data
                    localStorage.setItem('grantType', grantType)
                    localStorage.setItem('accessToken', accessToken)
                    localStorage.setItem('refreshToken', refreshToken)

                    this.$router.push('/')
                })
            }catch(error){
                console.log(error);
                
            }
        }
    }
})
</script>

<style>
.container {
    margin-top: 50px;
    display: flex;
    justify-content: center;
}

.text-input {
    margin: 0;
    border: 0;
    box-sizing: border-box;
    padding: 0 6px;
    width: 300px;
    height: 30px;
}

button {
    margin: 0;
    border: 0;
    padding: 0;
}

.login {
    margin-top: 20px;
    color: white;
    background-color: rgb(13, 201, 0);
    margin-bottom: 5px;
}

.btn {
    width: 300px;
    height: 30px;
}


.btn-container {
    display: flex;
    justify-content: center;
}

p {
    color: white;
}
</style>