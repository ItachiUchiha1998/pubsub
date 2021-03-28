// modules
const router = require('express').Router()
import { json, urlencoded } from 'body-parser'
import multer from 'multer'

// controllers
import { 
    testController,
    createPortfolioController,
    getPortfoliosController,
    NotFoundController
} from "../controllers/index"

// middlewares
router.use(json());
router.use(urlencoded({ extended: true }))

// multer
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './assets/originalImage/');
     },
    filename: function (req, file, cb) {
        cb(null , file.originalname);
    }
})

const upload = multer({ storage: storage })

// routes
router.post('/test', testController)

router.post('/portfolio/create', upload.single('photo'), createPortfolioController)

router.post('/portfolio/get', getPortfoliosController)

router.all('*', NotFoundController)

export default router
