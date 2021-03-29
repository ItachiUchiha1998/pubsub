import Queue from 'bull'

import { CATTLE } from '../db/models';
import { 
    REDIS_HOST,
    REDIS_PORT,
    REDIS_PASSWORD
} from '../config'

import resizeImage from '../jobs/resizeImage'

export async function createPortfolio(req, res) {

    try {
        
        if(!req.file) {
            return res.status(400).json({
                msg: "Missing Params"
            })
        }

        const { name } = req.body
        const { filename } = req.file

        if(!name || !filename) {
            return res.status(400).json({
                msg: "Missing Params"
            })
        }
        
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
