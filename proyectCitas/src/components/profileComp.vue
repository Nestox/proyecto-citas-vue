<template>
    <h1>Profile Component</h1>
</template>

<script setup>
import { ref } from 'vue';

const profile = ref({
    username: '',
    name: '',
    lastname: '',
    email: '',
    phone: '',
    date: ''
})

function getProfile(){
    
}

</script>