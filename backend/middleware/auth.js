const jwt=require('jsonwebtoken');
const dotenv=require('dotenv');

dotenv.config();



function login(req,res,next){
    const authHeader=req.headers.authorization;
    if(authHeader){
        const token=authHeader && authHeader.split(' ')[1];
jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
    if (err) return res.sendStatus(403);
    req.user=user;
    next();

});
    }
 else {
    res.sendStatus(401);
  }
    }

    function authorizeRoles(...roles){
        return(req,res,next)=>{
if(!roles.includes(req.user.role)) return res.sendStatus(403);
next();
        };
    }
module.exports={login,authorizeRoles}