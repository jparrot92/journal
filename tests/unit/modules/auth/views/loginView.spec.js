import { shallowMount } from '@vue/test-utils'
import LoginView from '@/modules/auth/views/LoginView.vue'

import createVuexStore from '../../../mock-data/mock-store'
import createVueRouter from '../../../mock-data/mock-router'

import Swal from 'sweetalert2'

jest.mock('sweetalert2', () => ({
    fire: jest.fn(),
    showLoading: jest.fn(),
    close: jest.fn()
}))

describe('Pruebas en el LoginView Component', () => {

    const router = createVueRouter([
        {
          path: '/',
          name: 'no-entry',
          component: () => import(/* webpackChunkName: "daybook-no-entry" */ '@/modules/daybook/views/NoEntrySelected.vue'),
        }
    ])
    
    const store = createVuexStore({
        status: 'not-authenticated', // 'authenticated','not-authenticated', 'authenticating'
        user: null,
        idToken: null,
        refreshToken: null
    })

    store.dispatch = jest.fn()

    beforeEach(() => jest.clearAllMocks() )

    test('debe de hacer match con el snapshot', () => {
        
        const wrapper = shallowMount( LoginView, {
            global: {
                plugins: [ store, router ]
            }
        })

        expect(wrapper.html()).toMatchSnapshot()
    })

    test('credenciales incorrectas, disparar el SWAL', async() => {
        
        store.dispatch.mockReturnValueOnce({ ok: false, message: 'Error en credenciales' })

        const wrapper = shallowMount( LoginView, {
            global: {
                plugins: [ store, router ]
            }
        })

        await wrapper.find('form').trigger('submit')
        expect( store.dispatch ).toHaveBeenCalledWith('auth/signInUser', { email: '', password: ''})
        expect( Swal.fire ).toHaveBeenCalledWith('Error', 'Error en credenciales', 'error')
    })

    test('debe de redirigir a la ruta no-entry', async() => {
        
        store.dispatch.mockReturnValueOnce({ ok: true })

        const wrapper = shallowMount( LoginView, {
            global: {
                plugins: [ store, router ]
            }
        })

        const [ txtEmail, txtPassword ] = wrapper.findAll('input')
        await txtEmail.setValue('fernando@gmail.com')
        await txtPassword.setValue('123456')

        const push = jest.spyOn(router, 'push')
        await wrapper.find('form').trigger('submit')

        expect( store.dispatch ).toHaveBeenCalledWith('auth/signInUser', { email: 'fernando@gmail.com', password: '123456' })
        expect( push ).toHaveBeenCalledWith({ name: 'no-entry' })

    })

})