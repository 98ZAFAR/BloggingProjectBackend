const jwt = require('jsonwebtoken');

const ValidateUser = (req, res, next)=>{
    const authHeaders = req.headers['authorization'];
    const token = authHeaders && authHeaders.split(' ')[1];

    try {
        if(!token){
            res.status(400).json({error:"Token not found!"});
            return next();
        }

        const user = jwt.verify(token, process.env.SECRET_KEY);

        req.user = user;
        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({error});
    }
}

module.exports = ValidateUser;