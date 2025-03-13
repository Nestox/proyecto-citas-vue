<template>
    <div class="container">
        <h1>Controlador de Citas</h1>

        <!-- Button trigger modal -->
        <button type="button" class="btn btn-primary mb-3 me-3" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Crear nueva cita
        </button>
        <button type="button" class="btn btn-success mb-3" v-on:click="pillarCitas">
            Actualizar lista de Citas
        </button>
        <!-- #region Modal Crear Cita -->
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
                        <br>
                        <label for="hour" class=" pe-4">Selecciona una hora: </label>
                        <select name="time" id="hour">
                            <option v-for="hour in 24" :value="hour">{{ hour < 10 ? '0' + hour : hour }}:00</option>
                        </select>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" v-on:click="clearCrearCita" data-bs-dismiss="modal">Cancelar</button>
                        <button type="button" class="btn btn-primary" v-on:click="crearCita" data-bs-dismiss="modal">Guardar Cita</button>
                    </div>
                </div>
            </div>
        </div>
        <!--#endregion-->

        <!-- #region Modal Eliminar Cita -->
        <div class="modal fade" id="eliminarModal" tabindex="-1" aria-labelledby="eliminarModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="eliminarModalLabel">Eliminar Cita</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <h1 class="text-danger">¿ESTAS SEGURO DE QUE DESEAS ELIMINAR LA CITA?</h1>
                    </div>
                    <div class="modal-footer align-content-around">
                        <button type="button" class="btn btn-secondary " v-on:click="tempIndex = 0" data-bs-dismiss="modal">Cancelar</button>
                        <button type="button" class="btn btn-primary" v-on:click="eliminarCita(tempIndex)" data-bs-dismiss="modal">Eliminar Cita</button>
                    </div>
                </div>
            </div>
        </div>
        <!--#endregion-->

        <!-- #region mostrar Citas del usuario-->
            <h1>Citas</h1>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Centro</th>
                        <th scope="col">Fecha</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(element, index) in StoredCenter" :value="center">
                        <td>{{ element }}</td>
                        <td>{{ StoredDate[index] }}</td>
                        <td class="text-center"><button type="button" class="btn btn-danger" data-bs-toggle="modal" v-on:click="tempIndex = index" data-bs-target="#eliminarModal">Eliminar Cita</button></td>
                    </tr>
                </tbody>
            </table>
        <!--#endregion-->
    </div>
</template>

<script setup>
    import { onMounted, ref } from 'vue';
    import { generateApppoitment, getAllcentros, getUserAppointments, deleteAppointment } from './IOAPI';

    onMounted(() => {
        requestCenters();
        pillarCitas();
    })

    const CitaData = ref({
        center: '',
        date: ''
    })

    const StoredCenter = ref([])
    const StoredDate = ref([])
    const tempIndex = ref(0)

    //Añadir la funcion de obtener citas y manejar que se mueste si no hay datos en la BBDD
    const pillarCitas = async () => {
        try {
            StoredCenter.value = []
            StoredDate.value = []
            const response = await getUserAppointments()
            // console.log('Response from getUserAppointments:', response)
            response.forEach(element => {
                // console.log('Element:', element)
                StoredCenter.value.push(element.center);
                // console.log('Centro almacenado: ',StoredCenter.value);
                StoredDate.value.push(element.date);
            });

        } catch (error) {
            console.error('Error fetching centers:', error)
        }

    }

    //Añadir la creacion de citas para que se guarden a la base de datos
    const crearCita = async () => {
        try {
            CitaData.value.date = CitaData.value.date.split('-').reverse().join('/');
            // console.log(CitaData.date);
            CitaData.value.date = CitaData.value.date + ' ' + document.getElementById('hour').value + ':00:00';
            const response = await generateApppoitment(CitaData.value)
            // console.log('Respuesta: ', response)
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
            // console.log('Response from getAllcentros:', response)
            response.forEach(element => {
                // console.log('Element:', element)
                if (element.name) {
                    nombre.value.push(element.name);
                } else {
                    console.warn('Missing expected fields in element:', element)
                }
            });

            // console.log('Nombre array:', nombre.value)
        } catch (error) {
            console.error('Error fetching centers:', error)
        }
    }

    const eliminarCita = async (index) => {
        try {
            const datasent = {
                center: StoredCenter.value[index],
                date: StoredDate.value[index]
            }
            // const tempdel = StoredDate.value[index]
            const response = await deleteAppointment(datasent)
            console.log('Index de cita: ', datasent)
            console.log('Response from deleteApppoitment:', response)
        } catch (error) {
            console.error('Error fetching centers:', error)
        }
    }
</script>