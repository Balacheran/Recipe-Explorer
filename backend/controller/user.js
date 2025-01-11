const User = require("../models/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const userSignUp = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password is required" })
    }
    let user = await User.findOne({ email })
    if (user) {
        return res.status(400).json({ error: "Email is already exist" })
    }
    const hashPwd = await bcrypt.hash(password, 10)
    const newUser = await User.create({
        email, password: hashPwd
    })
    let token = jwt.sign({ email, id: newUser._id }, process.env.SECRET_KEY)
    console.log("Username: "+email+" is Created Successfully")
    return res.status(200).json({ token, user:newUser })

}

const userLogin = async (req, res) => {
    const { email, password } = req.body
    if (!email && !password ) {
        return res.status(400).json({ message: "Email and password is required" })
    }
    let user = await User.findOne({ email })
    if (user) {
        let token = jwt.sign({ email, id: user._id }, process.env.SECRET_KEY)
        console.log("User ID: "+user._id + " Logged In")
        return res.status(200).json({  user })
    }
    else {
        return res.status(400).json({ error: "Invaild credientials" })
    }
}

const getUser = async (req, res) => {
    const user = await User.findById(req.params.id)
    res.json({email:user.email})
}

module.exports = { userLogin, userSignUp, getUser }