const router = require('express').Router();
import { json, urlencoded } from 'body-parser';

import { 
    testController,
    createPortfolioController,
    getPortfoliosController,
    NotFoundController
} from "../controllers/index";

// middlewares
router.use(json());
router.use(urlencoded({ extended: true })); 

// routes
router.post('/test', testController);

router.post('/portfolio/create', createPortfolioController);

router.post('/portfolio/get', getPortfoliosController);

router.all('*', NotFoundController);

export default router;
