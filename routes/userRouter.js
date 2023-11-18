const {Router} = require("express");
const { getUsers, register, login, verify_email } = require("../controllers/userController");

const userRouter = Router();

userRouter.get("/allUsers", async(req,res) => {
    //http://localhost:4000/users/allUsers
    try {
        const data = await getUsers(req);
        res.send(data);
    } catch (error) {
        console.log(error);
        res.send({error: error.message})
    }
})

userRouter.post("/register", async(req,res) => {
    try {
        const data = await register(req);
        res.send(data);
    } catch (error) {
        console.log(error);
        res.send({error: error.message})
    }
})

userRouter.post("/login", async(req,res) => {
    try {
       const data = await login(req);
       res.send(data);
    } catch (error) {
        console.log(error);
        res.send({error: error.message})
    }
})

userRouter.get("/verify_email/:token", async(req,res) => {
    try {
        const data = await verify_email(req);
        res.send(data);
     } catch (error) {
         console.log(error);
         res.send({error: error.message})
     }
})


module.exports = userRouter;