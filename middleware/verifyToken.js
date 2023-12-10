const jwt = require("jsonwebtoken")

const verifyToken = async (req, res, next) => {
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(' ')[1]
    if (token === null) return res.sendStatus(401)
    jwt.verify(token, process.env.SECRET_KEY, (err, decode) => {
        if (err) return res.status(403).json(err)
        req.body.user = decode
        next()
    })
}

module.exports = verifyToken