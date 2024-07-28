const Express = require("express")
const Mongoose = require("mongoose")
const Cors = require("cors")
const Bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const userModel = require("./models/users")

let app = Express()

app.use(Express.json())
app.use(Cors())

Mongoose.connect("mongodb+srv://raifashafi:raifashafi@cluster0.tznb7.mongodb.net/blogappDB?retryWrites=true&w=majority&appName=Cluster0")


app.post("/signUp", async (req, res) => {
    let input = req.body
    let hashedPassword = Bcrypt.hashSync(req.body.password, 10)
    console.log(hashedPassword)
    req.body.password = hashedPassword

    let check = userModel.find({ email: req.body.email }).then(
        (items) => {
            if (items.length > 0) {
                res.json({ "status": "emailid already existed" })

            }
            else {
                let result = new userModel(input)
                result.save()
                res.json({ "status": "success" })
            }

        }

    ).catch(
        (error) => { }
    )
})
app.listen(3030, () => {
    console.log("server started")
})