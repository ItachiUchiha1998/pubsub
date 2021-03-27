import Jimp from 'jimp'

export async function test(req, res) {
    try {

        const rootFolder = `./assets/`

        const imagePath = `${rootFolder}/originalImage/download.jpg`

        const readImage = await Jimp.read(imagePath)
        
        const resizedImage = readImage
                            .resize(140, 140) // resize
                            .write(`${rootFolder}/resizedImage/download-resized.jpg`); // save
  
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
  