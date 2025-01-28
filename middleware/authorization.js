const Authorize = (roles)=>{
    return async(req, res, next)=>{
        try {
            if(!roles.includes(req.user.role)){
                return res.status(401).json({message:"Unauthorized Access!"});
            }
            next();
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = Authorize;