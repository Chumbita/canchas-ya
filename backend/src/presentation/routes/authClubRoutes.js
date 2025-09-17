import express from 'express';
import { googleAuthClubController } from '../controllers/authClubController.js';
import { formRegisterController } from '../controllers/formRegisterController.js';
import { upload } from '../../infraestructure/multer.js';

const router = express.Router();

router.post('/club/google', googleAuthClubController);

router.post('/club/form', upload.fields([
    {name: 'cuitCert', maxCount: 1},
    {name: 'municipalAuth', maxCount: 1}
    ]),
    formRegisterController
);

export default router;