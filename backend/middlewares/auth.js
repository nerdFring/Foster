import jwt from 'jsonwebtoken'

export const protect=(req,res,next)=>{
    const token = req.cookies.token;
    if (!token)
        return res.status(401).json({message:"not authenticated"});
    
    try {
        const decode=jwt.verify(token,process.env.secretKey)
        req.userId=decode.id
    } catch (error) {
            return res.status(401).json({ message: "Invalid token" });

    }
}
