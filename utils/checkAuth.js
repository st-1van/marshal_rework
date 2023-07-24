const jwt = require("jsonwebtoken");

exports.checkAuth = (req,res,next)=>{
    const token = (req.headers.authorization|| '').replace(/Bearer\s?/,'');

    if (token) {
        try {
            const decoded = jwt.verify(token, 'secret123')
            req.userId = decoded._id;
            next();
        } catch (error) {
            return res.status(403).json({
                message:'нема доступу'
            })
        }
    } else {
        return res.status(403).json({
            message:"нема доступу"
        })
    }  
}