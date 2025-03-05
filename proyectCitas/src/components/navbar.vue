<template>
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">Citas Electronicas</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Centros Disponibles
                        </a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="#">Action</a></li>
                            <li><hr class="dropdown-divider"></li>
                            <li><a class="dropdown-item" href="#">Something else here</a></li>
                        </ul>
                    </li>
                </ul>
                <form class="d-flex" role="search">
                    <button type="button" class="btn px-3" v-on:click="changetheme()"><i class="bi bi-moon-stars"></i></button>
                    <button class="btn btn-outline-primary" type="button">Log Out</button>
                </form>
                </div>
            </div>
        </nav>
</template>

<script setup>
    import { ref } from 'vue';
    import { setTheme } from '@/stores/themejs';

    const theme = ref('dark')

    function changetheme(){
        setTheme(theme.value)
        if (theme.value === 'dark'){
            theme.value = 'light'
        }
        else{
            theme.value = 'dark'
        }
    }
</script>