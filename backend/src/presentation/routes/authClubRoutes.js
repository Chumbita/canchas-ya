import express from 'express';
import { googleAuthClubController } from '../controllers/authClubController.js';
import { formRegisterController } from '../controllers/formRegisterController.js';
import { uploadClubDocs } from '../../infraestructure/multer.js';

const router = express.Router();

router.post('/google', googleAuthClubController);
router.post('/register', uploadClubDocs, formRegisterController);

export default router;