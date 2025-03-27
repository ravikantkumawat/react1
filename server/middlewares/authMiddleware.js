// const jwt = require("jsonwebtoken");

// module.exports = function (req, res, next) {
//     //console.log(req);
//     try {
//         const token = req.headers.authorization.split(" ")[1];
//         //console.log(token);
//         const decodeToken = jwt.verify(token, process.env.jwt_secret);
//         // console.log(decodeToken);
//         req.body.userId = decodeToken.userId;
//         next();
//     } catch (err) {
//         res.status(401).send({
//             success: false,
//             message: "Invalid token",
//         })
//     }
// };

const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
    try {
        // Extract token from the Authorization header
        const token = req.headers.authorization.split(" ")[1];

        if (!token) {
            return res.status(401).send({
                success: false,
                message: "Token not provided",
            });
        }

        // Verify and decode the token
        const decodedToken = jwt.verify(token, process.env.jwt_secret);

        // Log the decoded token for debugging
        console.log('Decoded Token:', decodedToken);

        if (!decodedToken || !decodedToken.userId) {
            return res.status(401).send({
                success: false,
                message: "Token does not contain userId",
            });
        }

        // Attach userId to req.user
        req.user = { userId: decodedToken.userId };

        // Proceed to next middleware or route handler
        next();
    } catch (err) {
        console.error("JWT verification error:", err);
        res.status(401).send({
            success: false,
            message: "Invalid or expired token",
        });
    }
};
