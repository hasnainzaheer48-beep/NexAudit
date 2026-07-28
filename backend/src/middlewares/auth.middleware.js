const jwt = require('jsonwebtoken');



const authenticate = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).send("No Authorization");
    }
    const [type, token] = authorization.split(" ");
    if (!token || type !== "Bearer") {
        return res.status(401).send("Invalid Authorization Header");
    }

    //verifyin the token
    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }

    catch (error) {

        return res.status(401).send("Unauthorized");
    }


}

module.exports = { authenticate };