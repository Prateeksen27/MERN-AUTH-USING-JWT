import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/user.auth.js'
import postRoutes from './routes/posts.js';
import bodyParser from 'body-parser';
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/posts',postRoutes)

mongoose.connect(process.env.URI).then(()=>{
    console.log("Connected to MongoDB");
}).catch((err)=>{
    logger.error("MongoDB connection error:", err);
})

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});