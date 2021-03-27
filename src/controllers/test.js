import { TESTS } from '../db/models';

export async function test(req, res) {
    try {

        return res.status(200).json({ 
            msg: `TEST SUCCESS` 
        });
    
    } catch (e) {
  
      console.error(e);
      return res.status(502).json({ 
          msg: 'Error Occured' 
        });
    
      }
  }
  