import axios from 'axios'

const journalApi = axios.create({
    baseURL: 'https://journal-api-fbd6b-default-rtdb.europe-west1.firebasedatabase.app'
})

// console.log( process.env.NODE_ENV ) // TEST durante testing, 

export default journalApi


