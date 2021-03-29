import { read } from 'jimp'
import { CATTLE } from '../db/models';

import { 
    ORIGINAL_IMAGE_PATH,
    RESIZED_IMAGE_PATH,
} from '../config'

function resizeImage(userId, fileName) {
    return new Promise( async (resolve, reject) => {
    
        const imagePath = `${ORIGINAL_IMAGE_PATH}${fileName}`

        console.log("image path: " + imagePath)
    
        const readImage = await read(imagePath)

        const [fileName_field , fileName_ext] = fileName.split('.')

        const resizedImageUrl = `${RESIZED_IMAGE_PATH}${fileName_field}-resized.${fileName_ext}`
        
        const resizedImage = readImage
                            .resize(140, 140)
                            .write(resizedImageUrl)
        
        await CATTLE.findByIdAndUpdate(userId, { 
            is_resized: true,
            resized_image_url: `${fileName_field}-resized.${fileName_ext}`
        })
        
        resolve()
    });
}

export default resizeImage
