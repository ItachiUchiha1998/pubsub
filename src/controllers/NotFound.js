import { TESTS } from '../db/models';

export async function NotFound(req, res) {
    try {

        res.status(404).json({
            success: false,message: 'Page does not exist!'
        });
            
    } catch (e) {
  
      console.error(e);
      return res.status(502).json({ 
          msg: 'Error Occured' 
        });
    
      }
  }
  