const CryptoJs = require("crypto-js");

module.exports = (req,res,next) => {
    try {
        const authHeader = req.get("Authorization");
        if(!authHeader) {
            throw new Error("Authorization missing");
        }
        const token = authHeader.split(" ")[1];
        if(!token) {
            throw new Error("token missing");
        }
        const decryptedString = CryptoJs.AES.decrypt(token,process.env.CRYPTO_SECRET).toString(CryptoJs.enc.Utf8);
        if(!decryptedString) {
            throw new Error("Invalid token")
        }
        const userData = JSON.parse(decryptedString);
        if(userData.userId && userData.email) {
            req.isAuth = true;
            req.userId = userData.userId;
            req.email = userData.email;
            next();
        } else {
            throw new Error("Invalid token")
        }
    } catch (error) {
        console.log(error);
        req.isAuth = false;
        next();
    }
}