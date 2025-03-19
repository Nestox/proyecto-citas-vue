<template>

    <div class="RegisterForm" v-if="!modeSwitch">
        <div class="form form-login">
            <input v-model="storeRegis.username" placeholder="Enter your username" class="input input-login" type="text">
            <input v-model="storeRegis.name" placeholder="Enter your name" class="input input-login" type="text">
            <input v-model="storeRegis.lastname" placeholder="Enter your lastname" class="input input-login" type="text">
            <input v-model="storeRegis.email" placeholder="Enter your email" class="input input-login" type="email">
            <input v-model="storeRegis.password" placeholder="Enter your password" class="input input-login" type="password">
            <input v-model="storeRegis.phone" placeholder="Enter your phone" class="input input-login" type="tel">
            <input v-model="storeRegis.date" placeholder="Enter your date" class="input input-login" type="date">

            <button v-on:click="register" >Submit</button>
        </div>
    </div>

    <div class="LoginForm" v-if="modeSwitch">
        <div class="form form-login">
            <input v-model="storeLogin.username" placeholder="Enter your username" class="input input-login" type="text">
            <input v-model="storeLogin.password" placeholder="Enter your password" class="input input-login" type="password">

            <button v-on:click="login">Submit</button>
            <!-- <button v-on:click="y">AAAAAAA</button> -->
        </div>
    </div>
    
    <div class="subRow">
        <button type="button" v-on:click="modeSwitch=(modeSwitch) ? false : true, reglogbut = (reglogbut==='login') ? 'register' : 'login'">{{ reglogbut }}</button>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { tokenManager } from '@/stores/store';
import { getRegister, getLogin } from './IOAPI';
import router from '@/router';


const modeSwitch = ref(true)

const reglogbut = ref('login')

const storeRegis=ref(
    {
        username: '',
        name: '',
        lastname: '',
        email: '',
        password: '',
        phone: '',
        date: ''
    }
)

const storeLogin=ref(
    {
        username: '',
        password: ''
    })


const register = () => {
    storeRegis.value.date = storeRegis.value.date.split('-').reverse().join('/');
    console.log(storeRegis.date);
    const temp = getRegister(storeRegis.value);
    console.log("Register result: ", temp);
}

const login = async () => {
    const token = await getLogin(storeLogin.value);
    // console.log("token: ",token.access_token);
    if (token.msg === null || token.msg === undefined){
        tokenManager().guardarToken(token.access_token);
        router.push("/main")
    }
    else{
        alert("Error: "+token.msg);
        console.log("Error: ",token.msg);
    }
}

// const y = async () => {
//     console.log("tokendddd: ",tokenManager().llamarToken());
// }

</script>