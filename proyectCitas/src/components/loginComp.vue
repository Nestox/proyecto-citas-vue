<style scoped>
.form {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 20px;
    background: linear-gradient(to bottom, #0077be, #3b8df2);
    border-radius: 10px;
    overflow: hidden;
    perspective: 1000px;
    transform-style: preserve-3d;
    transform: rotateX(-10deg);
    transition: all 0.3s ease-in-out;
    box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
    animation: form-animation 0.5s ease-in-out;
}

@keyframes form-animation {
    from {
        transform: rotateX(-30deg);
        opacity: 0;
    }

    to {
        transform: rotateX(0deg);
        opacity: 1;
    }
}

.input {
    padding: 10px;
    border-radius: 5px;
    background-color: transparent;
    transition: border-color 0.3s ease-in-out, background-color 0.3s ease-in-out, transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
    transform-style: preserve-3d;
    backface-visibility: hidden;
    color: rgb(255, 255, 255);
    border: 2px solid #3b8df2;
    box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
}

.input::placeholder {
    color: #fff;
}

.input:hover,
.input:focus {
    border-color: #3b8df2;
    background-color: rgba(255, 255, 255, 0.2);
    transform: scale(1.05) rotateY(20deg);
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.3);
    outline: none;
}

button {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    background-color: #3b8df2;
    color: #fff;
    font-size: 16px;
    cursor: pointer;
    transform-style: preserve-3d;
    backface-visibility: hidden;
    transform: rotateX(-10deg);
    transition: all 0.3s ease-in-out;
    box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
}

button:hover {
    background-color: #0077be;
    font-size: 17px;
    transform: scale(1.05) rotateY(20deg) rotateX(10deg);
    box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
}

.subRow{
    /* display: flex; */
    /* justify-self: center; */
}

</style>

<template>


    <div class="RegisterForm" v-if="!modeSwitch">
        <div class="form">
            <input v-model="storeRegis.username" placeholder="Enter your username" class="input" type="text">
            <input v-model="storeRegis.name" placeholder="Enter your name" class="input" type="text">
            <input v-model="storeRegis.lastname" placeholder="Enter your lastname" class="input" type="text">
            <input v-model="storeRegis.email" placeholder="Enter your email" class="input" type="email">
            <input v-model="storeRegis.password" placeholder="Enter your password" class="input" type="password">
            <input v-model="storeRegis.phone" placeholder="Enter your phone" class="input" type="tel">
            <input v-model="storeRegis.date" placeholder="Enter your date" class="input" type="date">

            <button v-on:click="register" >Submit</button>
        </div>
    </div>

    <div class="LoginForm" v-if="modeSwitch">
        <div class="form">
            <input v-model="storeLogin.username" placeholder="Enter your username" class="input" type="text">
            <input v-model="storeLogin.password" placeholder="Enter your password" class="input" type="password">

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