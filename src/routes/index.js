// modules
import express from 'express'
const router = require('express').Router()
import { json, urlencoded } from 'body-parser'
import multer from 'multer'

// file imports
import { 
    testController,
    createPortfolioController,
    getPortfoliosController,
    NotFoundController
} from '../controllers/index'
import { 
    ORIGINAL_IMAGE_PATH,  

} from '../config'

// middlewares
router.use(json());
router.use(urlencoded({ extended: true }))
router.use(express.static('assets'))

// multer
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, ORIGINAL_IMAGE_PATH);
     },
    filename: function (req, file, cb) {
        cb(null , `${Date.now()}.jpg`);
    }
})

const upload = multer({ storage: storage })

// routes
router.post('/portfolio/create', upload.single('photo'), createPortfolioController)
router.get('/portfolio/get', getPortfoliosController)
router.all('*', NotFoundController)

export default router
