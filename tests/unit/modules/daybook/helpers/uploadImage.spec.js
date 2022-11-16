import 'setimmediate'
import cloudinary from 'cloudinary'
import axios from 'axios'

import uploadImage from '@/modules/daybook/helpers/uploadImage'

cloudinary.config({
    cloud_name: 'dv5fhqjdo',
    api_key: '118888497155164',
    api_secret: '9L3ewBORJlH3gEjUuy3EIcF9zyw'
})

describe('Pruebas en el uploadImage', () => {
    
    test('debe de cargar un archivo y retornar el url', async() => {
        
        const { data } = await axios.get('https://res.cloudinary.com/dv5fhqjdo/image/upload/v1668290843/uftne1witjysimv6tvph.jpg', {
            responseType: 'arraybuffer'
        })

        const file = new File([ data ], 'foto.jpg')

        const url = await uploadImage( file )

        expect( typeof url ).toBe('string')

        // Tomar el ID
        const segments = url.split('/')
        const imageId = segments[ segments.length - 1 ].replace('.jpg','')

        // Eliminar imagen
        const { deleted } = await cloudinary.v2.api.delete_resources(imageId)

        // Comprueba que la imagen haya sido eliminada
        expect(deleted[imageId]).toBe('deleted')
    })

    
    

})