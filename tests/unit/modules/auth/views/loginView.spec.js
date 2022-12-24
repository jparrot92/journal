import { shallowMount } from '@vue/test-utils'
import LoginView from '@/modules/auth/views/LoginView.vue'

import createVuexStore from '../../../mock-data/mock-store'
import createVueRouter from '../../../mock-data/mock-router'

describe('Pruebas en el LoginView Component', () => {

    const router = createVueRouter()
    
    const store = createVuexStore({
        status: 'not-authenticated', // 'authenticated','not-authenticated', 'authenticating'
        user: null,
        idToken: null,
        refreshToken: null
    })

    beforeEach(() => jest.clearAllMocks() )

    test('debe de hacer match con el snapshot', () => {
        
        const wrapper = shallowMount( LoginView, {
            global: {
                plugins: [ store, router ]
            }
        })

        expect(wrapper.html()).toMatchSnapshot()
    })

})