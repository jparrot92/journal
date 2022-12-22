import { shallowMount } from '@vue/test-utils'

import NavBar from '@/modules/daybook/components/NavBar.vue'
import createVuexStore from '../../../mock-data/mock-store'

describe('Pruebas en el Navbar component', () => {

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
                plugins: [ store ]
            }
        })

        expect(wrapper.html()).toMatchSnapshot()

    })
    
})
