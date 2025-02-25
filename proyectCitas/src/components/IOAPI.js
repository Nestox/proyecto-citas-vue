const APIURL = "http://127.0.0.1:5000"


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