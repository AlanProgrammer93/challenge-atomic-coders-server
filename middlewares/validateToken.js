const jwt = require('jsonwebtoken');

const validateJWT = (req, res, next) => {
    try {
        const token = req.header('token');
        if (!token) {
            return res.status(401).json({
                ok: false,
                msg: 'No token'
            });
        }

        const { uid } = jwt.verify(token, process.env.JWT_KEY);
        req.uid = uid;
        
        next();

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Invalid Token'
        });
    }
}

module.exports = {
    validateJWT
}