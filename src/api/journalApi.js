import axios from 'axios'

const journalApi = axios.create({
    baseURL: 'https://journal-api-fbd6b-default-rtdb.europe-west1.firebasedatabase.app'
})

export default journalApi


