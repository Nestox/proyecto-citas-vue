import { ref } from 'vue'
import { defineStore } from 'pinia'

export const tokenManager=defineStore("almacen",() => {

    const token = ref(null);

    const guardarToken=(token1) =>{
        token.value = token1;
    };

    const llamarToken = () =>{
        return token.value;
    };

    const borrarToken = () => {
        token.value = null;
    };

return{guardarToken, llamarToken, borrarToken}

});