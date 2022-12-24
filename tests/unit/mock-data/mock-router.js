import { createRouter, createWebHashHistory } from 'vue-router'

import router from "@/router"

const createVueRouter = () => 
    createRouter({
        history: createWebHashHistory(),
        routes: router.options.routes,
    })

export default createVueRouter