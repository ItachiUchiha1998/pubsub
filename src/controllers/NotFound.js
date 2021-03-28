export async function NotFound(req, res) {
    try {

        res.status(404).json({
            success: false,
            msg: 'Page does not exist!'
        });
            
    } catch (e) {
  
      console.error(e);
      return res.status(502).json({ 
          msg: 'Error Occured' 
        });
    
    }
}
