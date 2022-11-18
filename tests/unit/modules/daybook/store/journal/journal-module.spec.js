import { createStore } from 'vuex'
import journal from '@/modules/daybook/store/journal'
import { journalState } from '../../../../mock-data/test-journal-state'


const createVuexStore = (initialState) => createStore({
    modules: {
        journal: {
            ...journal,
            state: { ...initialState }
        }
    }
})

describe('Vuex - Pruebas en el Journal Module', () => {

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


})