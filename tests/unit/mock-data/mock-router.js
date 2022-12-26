import { createRouter, createWebHashHistory } from 'vue-router'

const createVueRouter = (routes) => 
    createRouter({
        history: createWebHashHistory(),
        routes,
    })

export default createVueRouter