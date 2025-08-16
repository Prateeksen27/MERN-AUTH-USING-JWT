import express from 'express';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

router.get('/posts',verifyToken,(req,res)=>{
    res.send('Posts fetched successfully');
})

export default router;