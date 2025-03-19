const APIURL = "http://127.0.0.1:5000"

import { tokenManager } from '@/stores/store';

const APiCall=async(endpoint, method, token=null, body)=>{
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;
    
    const options = { method, headers };
    if (body) options.body = JSON.stringify(body);

    try {
        const result = await fetch(`${APIURL}${endpoint}`, options);
        const data = await result.json();
        // console.log('data:', data);
        // if (data.access_token) {return data.access_token;}
        return data;
    } catch (error) {
        console.error(`Error en ${endpoint}:`, error);
        return;
    }
}

export const getRegister = async (userData) =>{
    APiCall('/register', 'POST', null, userData)
    // console.log('userData:', userData);
}

export const getLogin = async (userData) =>{
    const tokenreturn = APiCall('/login', 'POST', null, userData)
    // console.log('userData:', userData);
    return tokenreturn;
}

export const updateUserData = async (userData) =>{
    APiCall('/currentUser', 'PATCH', tokenManager().llamarToken(), userData)

}

export const getAllcentros = async () => {
    const allCentros = APiCall('/centers', 'GET',tokenManager().llamarToken(),null)
    console.log('centros: ', allCentros)
    return allCentros
}

export const getProfile = async () => {
    const profile = APiCall('/profile', 'GET',tokenManager().llamarToken(),null)
    // console.log('profile: ', profile)
    return profile
}

export const getUserAppointments = async () => {
    const userAppointments = APiCall('/date/getByUser', 'GET',tokenManager().llamarToken(),null)
    // console.log('appointments: ', appointments)
    return userAppointments
}

export const generateApppoitment = async (userData) => {
    const appointment = APiCall('/date/create', 'POST', tokenManager().llamarToken(), userData)
    return appointment
}

export const deleteAppointment = async (userData) =>{
    const yeetApointment = APiCall('/date/delete', 'POST', tokenManager().llamarToken(), userData)
    return yeetApointment
}

