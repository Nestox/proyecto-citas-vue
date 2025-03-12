<template>
    <div class="row text-center pb-4">
        <h1>Centros Disponibles</h1>
    </div>
    <div class="container">
        <div class="row pb-3 justify-content-center">
            <div class="col-4">

                <div class="card center" style="width: 18rem;">
                    <!-- <img src="..." class="card-img-top" alt="..."> -->
                    <div class="card-body">
                        <h5 class="card-title">{{nombre[0]}}</h5>
                        <p class="card-text">{{direccion[0]}}</p>
                        <!-- <a href="#" class="btn btn-primary">Go somewhere</a> -->
                    </div>
                </div>
            </div>
            <div class="col-4">
                <div class="card center" style="width: 18rem;">
                    <!-- <img src="..." class="card-img-top" alt="..."> -->
                    <div class="card-body">
                        <h5 class="card-title">{{ nombre[1] }}</h5>
                        <p class="card-text">{{ direccion[1] }}</p>
                        <!-- <a href="#" class="btn btn-primary">Go somewhere</a> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { onMounted, ref } from 'vue';
    import { getAllcentros } from './IOAPI';


    onMounted(()=>{
        requestCenters()
    })

    const nombre = ref([])
    const direccion = ref([])

    const requestCenters = async () => {
        try {
            const response = await getAllcentros()
            console.log('Response from getAllcentros:', response)
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
    
</script>