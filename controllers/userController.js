const { genSalt, hash } = require("bcrypt");
const { users } = require("../mongoConfig");
const CryptoJs = require("crypto-js");

const getUsers = () => {
    return users.find({}).toArray();
}
const register = async(req) => {
    const {email,phone,password} = req.body;
    const userData = await users.findOne({$or: [{email,phone}]});
    if(userData) {
        throw new Error("User already registered");
    }
    const salt = await genSalt();
    const hashedPass = await hash(password,salt);
    const data = await users.insertOne({
        ...req.body,
        password: hashedPass
    });
    return data;
}

const login = async (req) => {
    const { email, phone, password } = req.body;
    const userData = await users.findOne({ $or: [{ email }, { phone }] });
    if (!userData) {
      throw new Error("Email/Phone not registered");
    }
    const { password: hashedPass } = userData;
    const checkPass = await compare(password, hashedPass);
    if (!checkPass) {
      throw new Error("Wrong Credentials");
    }
    const token = CryptoJs.AES.encrypt(
      JSON.stringify({userId: userData._id, email: userData.email}),
      process.env.CRYPTO_SECRET
    ).toString();
    //const token = jwt.sign({userId:userData._id,email: userData.email},process.env.CRYPTO_SECRET)
    delete userData.password;
    return {
        ...userData,
        token
    }
} 


module.exports = {getUsers,register,login}