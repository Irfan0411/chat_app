const User = require("../models/user.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const register = async (req, res) => {
    try {
        // generate new password
        const salt = await bcrypt.genSalt()
        const newPassword = await bcrypt.hash(req.body.password, salt)
    
        // create new user
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: newPassword,
            userId: Math.random().toString(20).slice(2)
        })
    
        const user = await newUser.save()
        const {_id, __v, password, ...data} = user._doc
        res.status(200).json(data)
    } catch (err) {
        res.status(500).json(err)
    }
}

const login = async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email})
        !user && res.status(404).json({msg: "user not found"})
    
        const validPassword = await bcrypt.compare(req.body.password, user.password)
        !validPassword && res.status(400).json({msg: "wrong password"})
        
        const {_id, __v, password, ...data} = user._doc
        const Token = jwt.sign(data, process.env.SECRET_KEY, { expiresIn: '1d' })
        
        res.cookie('Token', Token, {
            httpOnly: true,
            maxAge: 24*60*60*1000
        })
        res.status(200).json(data)
    } catch (err) {
        res.status(500).json(err)
        console.log(err);
    }    
}

module.exports = { register, login }
