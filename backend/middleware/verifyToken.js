import jwt from 'jsonwebtoken';
export const verifyToken = (req,res,next)=>{
    const token = req.header('auth-token');
    if(!token) {
        return res.status(401).send('Access denied. No token provided.');
    }

    try {
        const verified = jwt.verify(token, process.env.SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).send('Invalid token');
        console.error('Token verification error:', error);
    }
}