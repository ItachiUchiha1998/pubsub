const router = require('express').Router();
import { json, urlencoded } from 'body-parser';

import { testController } from "../controllers/index";

// middlewares
router.use(json());
router.use(urlencoded({ extended: true })); 

// routes
router.post('/test', testController);

router.post('*', (req,res) => {
        res.status(404).json({
            success: false,message: 'Page does not exist!'
        });
});

router.all('*', (req,res) => {
        res.status(404).json({
            success: false,message: 'Page does not exist!!'
        });
});

export default router;
