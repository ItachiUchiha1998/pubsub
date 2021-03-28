import { read } from 'jimp'
import Queue from 'bull'
import { CATTLE } from '../db/models'

function resizeImage(userId, fileName) {
    return new Promise( async (resolve, reject) => {
    
        const rootFolder = `./assets/`

        const imagePath = `${rootFolder}/originalImage/${fileName}`
    
        const readImage = await read(imagePath)
        
        const resizedImage = readImage
                            .resize(140, 140)
                            .write(`${rootFolder}/resizedImage/${fileName}-resized.PNG`)
        
        await CATTLE.findByIdAndUpdate(userId, { is_resized: true } )
        
        resolve(true)
    });
}

export async function test(req, res) {
    try {

        const { file_name, user_id } = req.body

        const imageResizeQueue = new Queue('resize', {
            redis: {
              host: 'redis-16318.c256.us-east-1-2.ec2.cloud.redislabs.com',
              port: 16318,
              password: 'RN8LASxaNRLysrLR2BYx6Q7NOyx7pNFk'
            }
          })

        const data = {
            fileName: file_name,
            userId: user_id
        }
          
        const options = {
            delay: 60000,
            attempts: 2
        }
        
        imageResizeQueue.add(data, options);
          
        imageResizeQueue.process(async job => { 
            console.log("Resize Image job queued")
            await resizeImage(job.data.userId, job.data.fileName)
            console.log("Image resized successfully")
            return
        });

        return res.status(200).json({
            msg: true 
        });
    
    } catch (e) {
  
      console.error(e);
      return res.status(502).json({ 
          msg: 'Error Occured' 
        });
    
      }
  }
  