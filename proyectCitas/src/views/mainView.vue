<template>
    <div class="container">
        <div class="row pb-2">
            <navbar />
        </div>
        <div class="row text-center bg-primary">
            <div class="col-4 p-2" id="regCita">
                <button type="button" id="btn-regCita" class="btn btn-secondary" v-on:click="changeComp('regCita')">Registrar Cita</button>
            </div>
            <div class="col-4 p-2" id="centers">
                <button type="button" id="btn-centers" class="btn btn-secondary" v-on:click="changeComp('centers')">Centros Disponibles</button>
            </div>
            <div class="col-4 p-2" id="userProf">
                <button type="button" id="btn-userProf" class="btn btn-secondary" v-on:click="changeComp('userProf')">Perfil de usuario</button>
            </div>
        </div>
        <div class="row bg-secondary">
            <div class="col-12">
                <span class="centerComp" v-if="option2">
                    <AvailableCenters />
                </span>
                <span class="regCitaComp" v-if="option1">
                    <RegCitaComp />
                </span>
                <span class="userProfComp" v-if="option3">
                    <ProfileComp />
                </span>
            </div>
        </div>
    </div>
</template>

<script setup>
    import AvailableCenters from '@/components/availableCenters.vue';
    import navbar from '@/components/navbar.vue';
    import ProfileComp from '@/components/profileComp.vue';
    import RegCitaComp from '@/components/regCitaComp.vue';
    import { onMounted, ref } from 'vue';
    import { tokenManager } from '@/stores/store';
    import router from '@/router';

    
    
    const option1 = ref(false)
    const option2 = ref(false)
    const option3 = ref(false)
    
    onMounted(() =>{
        const localtoken = tokenManager().llamarToken()
        // console.log(localtoken)
        if (localtoken === null){
            router.push('/')
        }
    })
    
    function changeComp(id){
        if(id === 'centers'){
            option1.value = false
            option2.value = true
            option3.value = false
            document.getElementById('centers').setAttribute('class', 'col-4 p-2 bg-secondary')
            document.getElementById('regCita').setAttribute('class', 'col-4 p-2')
            document.getElementById('userProf').setAttribute('class', 'col-4 p-2')
        }
        if(id === 'regCita'){
            option1.value = true
            option2.value = false
            option3.value = false
            document.getElementById('regCita').setAttribute('class', 'col-4 p-2 bg-secondary')
            document.getElementById('centers').setAttribute('class', 'col-4 p-2')
            document.getElementById('userProf').setAttribute('class', 'col-4 p-2')
        }
        if(id === 'userProf'){
            option1.value = false
            option2.value = false
            option3.value = true
            document.getElementById('regCita').setAttribute('class', 'col-4 p-2')
            document.getElementById('centers').setAttribute('class', 'col-4 p-2')
            document.getElementById('userProf').setAttribute('class', 'col-4 p-2 bg-secondary')
        }
    }

</script>