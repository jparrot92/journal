import { createRouter, createWebHashHistory } from 'vue-router'

import router from "@/router"

const createVueRouter = () => 
    createRouter({
        history: createWebHashHistory(),
        routes: [
            {
              path: '/',
              name: 'no-entry',
              component: () => import(/* webpackChunkName: "daybook-no-entry" */ '@/modules/daybook/views/NoEntrySelected.vue'),
            }],
    })

export default createVueRouter