import { CATTLE } from '../db/models';

export async function getPortfolios(req, res) {

    try {

        const data = await CATTLE.find().sort('-timestamp')

        return res.status(200).json({ 
            data: data 
        })
    
    } catch (e) {

        console.error(e);
        return res.status(502).json({ 
            msg: 'Error Occured' 
        });

    }
}
