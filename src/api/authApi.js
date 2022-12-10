import axios from 'axios'

const authApi = axios.create({
    baseURL: 'https://identitytoolkit.googleapis.com/v1/accounts',
    params: {
        key: 'AIzaSyAcV73-L1szJvwitrTNWWyCBQ_Rja5wLSA'
    }
})

// console.log( process.env.NODE_ENV ) // TEST durante testing, 

export default authApi


