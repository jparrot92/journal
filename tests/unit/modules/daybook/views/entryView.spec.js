import { shallowMount } from '@vue/test-utils'
import { createStore } from 'vuex'

import journal from '@/modules/daybook/store/journal'
import EntryView from '@/modules/daybook/views/EntryView.vue'

import { journalState } from '../../../mock-data/test-journal-state'

import Swal from 'sweetalert2'

const createVuexStore = (initialState) => createStore({
    modules: {
        journal: {
            ...journal,
            state: { ...initialState }
        }
    }
})

jest.mock('sweetalert2', () => ({
    fire: jest.fn(),
    showLoading: jest.fn(),
    close: jest.fn()
}))

describe('Pruebas en el EntryView', () => {

    const store = createVuexStore( journalState )
    store.dispatch = jest.fn()

    const mockRouter = {
        push: jest.fn()
    }
    
    let wrapper

    beforeEach(() => {
        // Limpia los mock caza vez que ejecuta una prueba
        jest.clearAllMocks()
        wrapper = shallowMount( EntryView, {
            props: {
                id: '-NDF1PyxyfLxOtMc_1gW',
            },
            global: {
                mocks: {
                    $router: mockRouter
                },
                plugins: [ store ]
            }
        })
    })
    
    test('debe de sacar al usuario porque el id no existe', () => {

        shallowMount( EntryView, {
            props: {
                id: 'Este ID no existe en el STORE',
            },
            global: {
                mocks: {
                    $router: mockRouter
                },
                plugins: [ store ]
            }
        })

        expect(mockRouter.push).toHaveBeenCalledWith({ name: 'no-entry' })

    })


    test('debe de mostrar la entrada correctamente', () => {

        expect( wrapper.html() ).toMatchSnapshot()
        expect(mockRouter.push).not.toHaveBeenCalled()

    })

    test('debe de borrar la entrada y salir', () => {

        Swal.fire.mockReturnValueOnce( Promise.resolve({ isConfirmed: true }) )

        wrapper.find('.btn-danger').trigger('click')

        expect(Swal.fire).toHaveBeenCalledWith({
            title: '¿Está seguro?',
            text: 'Una vez borrado, no se puede recuperar',
            showDenyButton: true,
            confirmButtonText: 'Si, estoy seguro'
        })
            
        setTimeout( () => {
            
            expect( store.dispatch ).toHaveBeenCalledWith('journal/deleteEntry', '-MfKM6PrX3s9QqURdLx5')
            expect( mockRouter.push ).toHaveBeenCalled()

        }, 1 )

    })

})