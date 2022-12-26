import { shallowMount } from '@vue/test-utils'

import NavBar from '@/modules/daybook/components/NavBar.vue'

import router from "@/router"

import createVuexStore from '../../../mock-data/mock-store'
import createVueRouter from '../../../mock-data/mock-router'

describe('Pruebas en el Navbar component', () => {

    const routerVue = createVueRouter(router.options.routes)

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
                plugins: [ store, routerVue ]
            }
        })

        expect(wrapper.html()).toMatchSnapshot()

    })

    test('click en logout, debe de cerrar sesión y redireccionar', async() => {
        
        const wrapper = shallowMount( NavBar, {
            global: {
                plugins: [ store, routerVue ]
            }
        })

        const push = jest.spyOn(routerVue, 'push')
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
