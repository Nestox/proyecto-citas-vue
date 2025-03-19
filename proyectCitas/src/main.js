import './assets/main.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
// import VueSweetalert2 from 'vue-sweetalert2';
// import 'sweetalert2/dist/sweetalert2.min.css';
// import Swal from 'sweetalert2/dist/sweetalert2.js'
// import 'sweetalert2/src/sweetalert2.scss'


import { createApp } from 'vue'
import { createPinia } from 'pinia'
// import { Swal } from 'sweetalert2'
import { gsap } from "gsap";
    
import { Flip } from "gsap/Flip";
import { EaselPlugin } from "gsap/EaselPlugin";


import App from './App.vue'
import router from './router'
gsap.registerPlugin(Flip,EaselPlugin);

const app = createApp(App)
// const Swal = require('sweetalert2')

// app.use(VueSweetalert2);
app.use(createPinia())
app.use(router)

app.mount('#app')

