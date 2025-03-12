<template>
    <div class="container">
        <div class="row text-center">
            <div >
                <h1>Perfil Personal</h1>
            </div>
        </div>
        <div class="row">
            <div class="col-1">

            </div>
            <div class="col-11" v-if="editing === false">
                <p>{{ profile.username }}</p>
                <p>{{ profile.name }}</p>
                <p>{{ profile.lastname }}</p>
                <p>{{ profile.email }}</p>
                <p>{{ profile.phone }}</p>
                <p>{{ profile.date }}</p>
            </div>
            <div class="col-11" v-if="editing === true">
                <div class="form justify-content-center">
                    <input                                 :placeholder =  "profile.username"   disabled    class="input row" type="text">
                    <input v-model="storeEdit.name"        :placeholder =  "profile.name"           class="input row" type="text">
                    <input v-model="storeEdit.lastname"    :placeholder =  "profile.lastname"       class="input row" type="text">
                    <input v-model="storeEdit.email"       :placeholder =  "profile.email"          class="input row" type="email">
                    <input v-model="storeEdit.password"    :placeholder =  "profile.password"       class="input row" type="password">
                    <input v-model="storeEdit.phone"       :placeholder =  "profile.phone"          class="input row" type="tel">
                    <input                                 :placeholder =  "profile.date"    disabled       class="input row mb-3" type="date ">

                    <button v-on:click="register" class="mb-3" >Submit</button>
                </div>
            </div>
        <div class="row justify-content-center pb-3" v-if="editing === false">
            <button type="button" class="btn btn-primary" v-on:click="editProfile">Editar Usuario</button>
        </div>
    </div>
    </div>
</template>

<script setup>
// import { tokenManager } from '@/stores/store';
import { onMounted, ref } from 'vue';
import { getProfile, updateUserData } from './IOAPI';

onMounted(() => {
    getProfileData();
})

const editing = ref(false)

const profile = ref({
    username: '',
    name: '',
    lastname: '',
    email: '',
    phone: '',
    date: ''
})

const storeEdit=ref({
        name: '',
        lastname: '',
        email: '',
        password: '',
        phone: '',
})

const getProfileData = async () => {
    // profile.value.date = profile.value.date.split('-').reverse().join('/');
    // console.log(storeRegis.date);
    // const profile = getRegister(storeRegis.value);
    // const response = await fetch("http://127.0.0.1:5000");
    const response = await getProfile()
    profile.value.username = response.username
    profile.value.name = response.name
    profile.value.lastname = response.lastname
    profile.value.email = response.email
    profile.value.phone = response.phone
    profile.value.date = response.date

    // console.log(profile.username)
    // console.log(profile.name)
    // console.log(profile.lastname)
    // console.log(profile.email)
    // console.log(profile.phone)
    // console.log(profile.date)

    // console.log("profile result: ", response);
}

const editProfile = () => {
    editing.value = true
}

const register = () => {
    // storeEdit.value.date = storeEdit.value.date.split('-').reverse().join('/');
    // console.log(storeEdit.date);
    const temp = updateUserData(storeEdit.value);
    console.log("Updated data result: ", temp);
    editing.value = false
    getProfileData()
}

</script>