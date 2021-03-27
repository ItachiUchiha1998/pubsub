import { CATTLE } from '../db/models';

export async function createPortfolio(req, res) {

    try {

        const { name, image_url } = req.body

        await CATTLE.create({
            timestamp: Date.now(),
            name: name,
            image_url: image_url
        });

        return res.status(200).json({ msg: `Cattle Protfolio Created` });

    } catch (e) {

        console.error(e);
        return res.status(502).json({ msg: 'Error Occured' });

    }
}
