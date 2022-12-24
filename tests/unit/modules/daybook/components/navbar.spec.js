import { shallowMount } from '@vue/test-utils'
import { createRouter, createWebHashHistory } from 'vue-router'

import { routes } from "@/router"
import NavBar from '@/modules/daybook/components/NavBar.vue'
import createVuexStore from '../../../mock-data/mock-store'

describe('Pruebas en el Navbar component', () => {

    const router = createRouter({
        history: createWebHashHistory(),
        routes: routes,
    })

    const store = createVuexStore({
        user: {
            name: 'Jaume',
            email: 'jaume@gmail.com'
        },
        status: 'authenticated',
        idToken: 'ABC',
        refreshToken: 'XYZ'
    })

    test('debe de mostrar el componente correctamente', () => {
        
        const wrapper = shallowMount( NavBar, {
            global: {
                plugins: [ store, router ]
            }
        })

        expect(wrapper.html()).toMatchSnapshot()

    })

    test('click en logout, debe de cerrar sesión y redireccionar', async() => {
        
        const wrapper = shallowMount( NavBar, {
            global: {
                plugins: [ store, router ]
            }
        })

        const push = jest.spyOn(router, 'push')
        await wrapper.find('button').trigger('click')

        expect(push).toHaveBeenCalledWith({"name": "login"})

        expect( store.state.auth ).toEqual({
            user: null,
            status: 'not-authenticated',
            idToken: null,
            refreshToken: null
        })

    })
    
})
