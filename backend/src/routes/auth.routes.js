import express from 'express'
import { login, logout, signUp,UpdateProfile} from '../controller/authController.js';
import {protectRoutes} from '../middlewares/tokenMIddleWare.js';
const router= express.Router();

router.post('/login' ,login);

router.post('/signUp' ,signUp);

router.get('/logout' ,logout);
router.put('/updateProfile', protectRoutes, UpdateProfile);
export default router;