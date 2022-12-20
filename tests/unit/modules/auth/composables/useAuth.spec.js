import useAuth from '@/modules/auth/composables/useAuth'

const mockStore = {
    dispatch: jest.fn(),
    // Commit
    // Getters
}

jest.mock('vuex', () => ({
    useStore: () => mockStore
}))

describe('Pruebas en useAuth', () => {

    beforeEach( ()=> jest.clearAllMocks() )

    test('createUser exitoso', async() => {
        
        const { createUser } = useAuth()

        const newUser = { name: 'Jaume', email: 'jaume@gmail.com' }
        mockStore.dispatch.mockReturnValue({ ok: true })

        const resp = await createUser( newUser )

        expect(mockStore.dispatch).toHaveBeenCalledWith('auth/createUser', newUser)
        expect(resp).toEqual({ ok: true })

    })

    test('createUser fallido, porque el usuario ya existe ', async() => {
        
        const { createUser } = useAuth()

        const newUser = { name: 'Jaume', email: 'jaume@gmail.com' }
        mockStore.dispatch.mockReturnValue({ ok: false, message: 'EMAIL_EXISTS' })

        const resp = await createUser( newUser )

        expect(mockStore.dispatch).toHaveBeenCalledWith('auth/createUser', newUser)
        expect(resp).toEqual({ ok: false, message: 'EMAIL_EXISTS' })

    })

})