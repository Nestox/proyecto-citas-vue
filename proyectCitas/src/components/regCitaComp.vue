<template>
    <div class="container">
        <h1>Controlador de Citas</h1>

        <!-- Button trigger modal -->
        <button type="button" class="btn btn-primary mb-3" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Crear nueva cita
        </button>

        <!-- Modal -->
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Nueva Cita</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <label for="centro-gen-input" class="pe-4 pb-4"> Centro: </label>
                        <select v-model="CitaData.center" id="centro-gen-input" type="text" required list="centrosLista"><!-- añadir formulario de creacion de citas -->
                            <option v-for="center in nombre" :value="center">{{ center }}</option>
                        </select>
                        <br>
                        <label for="date-gen-input" class="pe-4 pb-4">Fecha: </label>
                        <input v-model="CitaData.date" type="date" required id="date-gen-input"> <!--FORMULARIO: FECHA-->
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" v-on:click="clearCrearCita" data-bs-dismiss="modal">Cancelar</button>
                        <button type="button" class="btn btn-primary" v-on:click="crearCita" >Guardar Cita</button>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { generateApppoitment, getAllcentros } from './IOAPI';

onMounted(() => {
    requestCenters();
})

const CitaData = ref({
    center: '',
    date: ''
})

//Añadir la funcion de obtener citas y manejar que se mueste si no hay datos en la BBDD
const pillarCitas = async () => {
    try {
        const response = await getAllCitas()
        console.log('Response from getAllCitas:', response)
        response.forEach(element => {
            console.log('Element:', element)
            if (element.name && element.address) {
                nombre.value.push(element.name);
                direccion.value.push(element.address);
            } else {
                console.warn('Missing expected fields in element:', element)
            }
        });

        console.log('Nombre array:', nombre.value)
        console.log('Direccion array:', direccion.value)
    } catch (error) {
        console.error('Error fetching centers:', error)
    }

}

//Añadir la creacion de citas para que se guarden a la base de datos
const crearCita = async () => {
    try {
        CitaData.value.date = CitaData.value.date.split('-').reverse().join('/');
        console.log(CitaData.date);
        const response = await generateApppoitment(CitaData.value)
        console.log('Respuesta: ', response)
    } catch (error) {
        console.error('ERROR: ', error)
    }
}
const clearCrearCita = () => {
    CitaData.value.center = ''
    CitaData.value.date = ''
}

    const nombre = ref([])

    const requestCenters = async () => {
        try {
            const response = await getAllcentros()
            console.log('Response from getAllcentros:', response)
            response.forEach(element => {
                console.log('Element:', element)
                if (element.name) {
                    nombre.value.push(element.name);
                } else {
                    console.warn('Missing expected fields in element:', element)
                }
            });

            console.log('Nombre array:', nombre.value)
        } catch (error) {
            console.error('Error fetching centers:', error)
        }
    }
</script>