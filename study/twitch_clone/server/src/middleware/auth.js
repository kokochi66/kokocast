import jwt from 'jsonwebtoken'

const config = process.env

export const verifyToken = (req, res, next) => {
    let token = req.body.token || req.query.token || req.headers['authorization']

    if (!token) {
        return res.status(401).send('A token is required for authentication')
    }

    const tokenFromUser = 'Bearer oqweoqweqoweqweqwe'

    try {
        token = token.replace(/^Bearer\s+/, "")
        const decoded = jwt.verify(token, config.TOKEN_KEY)

        req.user = decoded
    } catch (err) {
        return res.status(410).send("Invalid Token")
    }

    return next()
}