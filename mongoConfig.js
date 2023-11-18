const {MongoClient}  = require("mongodb");

const mongoUrl = `mongodb+srv://nodebatch2:${process.env.MONGO_PASSWORD}@cluster0.dbgrgwj.mongodb.net/`;

const client = new MongoClient(mongoUrl);

const db = client.db(process.env.MONGO_DB);
const users = db.collection("Users");
const messages = db.collection("Messages");

module.exports = {users,messages};