import { read } from 'jimp'
import Queue from 'bull'

import { CATTLE } from '../db/models';
import { 
    ORIGINAL_IMAGE_PATH,
    RESIZED_IMAGE_PATH,
    REDIS_HOST,
    REDIS_PORT,
    REDIS_PASSWORD
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

export async function createPortfolio(req, res) {

    try {
        const { name } = req.body
        const { filename } = req.file
        
        const cattle = await CATTLE.create({
            timestamp: Date.now(),
            name: name,
            image_url: filename
        });

        const imageResizeQueue = new Queue('resize', {
            redis: {
              host: REDIS_HOST,
              port: REDIS_PORT,
              password: REDIS_PASSWORD
            }
          })

        const data = {
            fileName: `${cattle.image_url}`,
            userId: cattle._id
        }
          
        const options = {
            delay: 60000,
            attempts: 2
        }

        console.log("data file: "+data.fileName)
        console.log("Image resize job queued")
        imageResizeQueue.add(data, options)

        imageResizeQueue.process(async job => { 
            console.log("job file: "+job.data.fileName)
            await resizeImage(job.data.userId, job.data.fileName)
            console.log("Image resized successfully")
            return
        });

        return res.status(200).json({ 
            msg: `Cattle Protfolio Created`
        });

    } catch (e) {

        console.error(e);
        return res.status(502).json({ msg: 'Error Occured' });

    }
}
