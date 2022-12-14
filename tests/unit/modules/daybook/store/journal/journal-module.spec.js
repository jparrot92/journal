import { createStore } from 'vuex'
import journal from '@/modules/daybook/store/journal'
import { journalState } from '../../../../mock-data/test-journal-state'
import authApi from '@/api/authApi'


const createVuexStore = (initialState) => createStore({
    modules: {
        journal: {
            ...journal,
            state: { ...initialState }
        }
    }
})

describe('Vuex - Pruebas en el Journal Module', () => {

    beforeAll( async()=>{

        const { data } = await authApi.post(':signInWithPassword', {
            email: 'test@test.com',
            password: '123456', 
            returnSecureToken: true
        })

        localStorage.setItem('idToken', data.idToken)

    })

    // Basicas ==================
    test('este es el estado inicial, debe de tener este state', () => {
        
        const store = createVuexStore( journalState )
        const { isLoading, entries } = store.state.journal
        
        expect( isLoading ).toBeFalsy()
        expect( entries ).toEqual( journalState.entries )

    })

    // Mutations ==================
    test('mutation: setEntries', () => {
        
        const store = createVuexStore({isLoading: true, entries:[]})

        store.commit('journal/setEntries', journalState.entries)
        expect(store.state.journal.entries.length).toBe(2)

        store.commit('journal/setEntries', journalState.entries)
        expect(store.state.journal.entries.length).toBe(4)

        expect(store.state.journal.isLoading).toBeFalsy()

    })

    test('mutation: updateEntry', () => {
    
        // create store con entries
        const store = createVuexStore( journalState )
        const updatedEntry = {
            id: '-NDF1PyxyfLxOtMc_1gW',
            date: 1664568863009,
            picture: 'https://res.cloudinary.com/dv5fhqjdo/image/upload/v1664579042/vpubxhkfovxbd40dpghm.webp',
            text: 'Hola, que tal?'
        }

        // commit de la mutación
        store.commit('journal/updateEntry', updatedEntry)

        const storeEntries = store.state.journal.entries

        // Expects
        // entries.lenght =2
        expect(storeEntries.length).toBe(2)

        // entries tiene que existir updatedEntry toEqual
        expect( 
            storeEntries.find( e => e.id === updatedEntry.id )
        ).toEqual( updatedEntry )

    })

    test('mutation: addEntry deleteEntry', () => {

        // crear store
        const store = createVuexStore( journalState )
        const entry = {
            id: 'ABC-123',
            text: 'Hola Mundo'
        }

        // addEntry { id: 'ABC-123', text: 'Hola Mundo' }
        store.commit('journal/addEntry', entry)

        const storeEntries = store.state.journal.entries

        // Expects
        // entradas sean 3
        expect(storeEntries.length).toBe(3)

        // entrada con el id ABC-123 exista
        expect( 
            storeEntries.find( e => e.id === entry.id )
        ).toBeTruthy()

        // deleteEntry, 'ABC-123'
        store.commit('journal/deleteEntry', 'ABC-123')

        // entradas sean 2
        expect(store.state.journal.entries.length).toBe(2)

        // entrada con el id ABC-123 no exista
        expect( 
            store.state.journal.entries.find( e => e.id === entry.id )
        ).toBeFalsy()

    })

    // Getters ==================
    test('getters: getEntriesByTerm getEntryById', () => {

        // crear store
        const store = createVuexStore( journalState )

        const [ entry1, entry2 ] = journalState.entries

        expect(store.getters['journal/getEntriesByTerm']('').length).toBe(2)
        expect(store.getters['journal/getEntriesByTerm']('erdsfadsf').length).toBe(1)

        expect( store.getters['journal/getEntriesByTerm']('erdsfadsf') ).toEqual([ entry2 ])

        expect( store.getters['journal/getEntryById']('-NDF1PyxyfLxOtMc_1gW') ).toEqual( entry1 )

    })

    // Actions ==================
    test('actions: loadEntries', async() => {
    
        const store = createVuexStore({ isLoading: true, entries: [] })

        await store.dispatch('journal/loadEntries')

        expect( store.state.journal.entries.length ).toBe(8)

    })

    test('actions: updateEntry', async() => {
        
        const store = createVuexStore( journalState )

        const updatedEntry = {
            id: '-NDF1PyxyfLxOtMc_1gW',
            date : 1627077227978,
            text : 'Hola mundo desde mock data',
        }

        await store.dispatch('journal/updateEntry', updatedEntry )

        expect( store.state.journal.entries.length ).toBe(2)
        expect( 
            store.state.journal.entries.find( e => e.id === updatedEntry.id )
        ).toEqual(updatedEntry)
    })

    test('actions: createEntry deleteEntry', async() => {
        
        // createStore
        const store = createVuexStore( journalState )

        // newEntry = { date: date: 1664568863009, text: 'Nueva entrada desde las pruebas'}
        const newEntry = { 
            date: 1664568863009,
            text: 'Nueva entrada desde las pruebas'
        }

        // dispatch de la acción createEntry
        // obtener el id de la nueva entrada
        const id = await store.dispatch('journal/createEntry', newEntry )

        // el ID debe de ser un string
        expect( typeof id ).toBe('string')

        // la nueva entrada debe de existir en el state.journal.entries...
        expect( 
            store.state.journal.entries.find( e => e.id === id )
        ).toBeTruthy()

        // # Segunda parte
        // dispatch deleteEntry
        await store.dispatch('journal/deleteEntry', id )

        // la nueva entrada NO debe de existir en el state.journal.entries...
        expect( 
            store.state.journal.entries.find( e => e.id === id )
        ).toBeFalsy()
    })
})