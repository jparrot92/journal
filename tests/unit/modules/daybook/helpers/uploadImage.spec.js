import axios from 'axios'
import uploadImage from '@/modules/daybook/helpers/uploadImage'

describe('Pruebas en el uploadImage', () => {
    
    test('debe de cargar un archivo y retornar el url', async() => {
        
        const { data } = await axios.get('https://res.cloudinary.com/dv5fhqjdo/image/upload/v1668290843/uftne1witjysimv6tvph.jpg', {
            responseType: 'arraybuffer'
        })

        const file = new File([ data ], 'foto.jpg')

        const url = await uploadImage( file )

        expect( typeof url ).toBe('string')

        
    })

    
    

})