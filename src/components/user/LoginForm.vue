<template>
    <form class="login-form" @submit.prevent="login">
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
                    <button class="btn home" @click="handleHome">홈으로</button>
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

<style>
.container {
    /* margin-top: 20vh; */
    display: flex;
    justify-content: center;
}

.text-input {
    margin: 0;
    border: 0;
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
    margin-bottom: 1px;
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

.login-form {
    padding-top: 20vh;
}
</style>