const verifyToken = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).send('Unauthorized: Token not provided');
    }

    try {
        const user = jwt.verify(token, process.env.SECRET);
        next();
    } catch (error) {
        console.log('Invalid Token: ' + token);
        return res.status(403).send('Forbidden: Invalid token');
    }
}

module.exports = {verifyToken}