import express from 'express';
import { loginUser, logout, resgisterUser } from '../controllers/user.controller.js';


const router = express.Router();

router.post('/register',resgisterUser)
router.post('/login',loginUser)
router.post('/logout',logout)

export default router;