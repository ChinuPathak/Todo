const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const jwtSecret = "MyNameIsChinmayPathak"

router.post('/createuser',
    body('email').isEmail(),
    body('password').isLength({ min: 5 })
    ,
    async (req, resp) => {
        const error = validationResult(req)
        if (!error.isEmpty()) {
            return resp.status(400).json({ error: error.array() })
        }

        const salt = await bcrypt.genSalt(10)
        let secPassword = await bcrypt.hash(req.body.password, salt)
        // hash take 2 parameter first is the thing whome we want to secure like in our case password and the second parameter is salt to make the password more secure.Salt is like a extra bits to make a password more safe and hard to decode
        try {
            await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPassword
            })
            resp.send({
                msg: "User Created Successfully",
                success: true
            })
        } catch (error) {
            resp.send({
                msg: `Error>>> ${error}`,
                success: false
            })
        }
    })

router.post('/loginuser',
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
    async (req, resp) => {
        let email = req.body.email
        let password = req.body.password
        const error = validationResult(req)
        if (!error.isEmpty()) {
            return resp.status(400).json({ error: error.array() })
        }
        try {
            let userData = await User.findOne({ email })
            if (!userData) {
                return resp.send("Please enter a valid email")
            }
            const pwtCompare = await bcrypt.compare(password, userData.password)
            if (!pwtCompare) {
                return resp.send({ success: false, msg: "Please enter a valid password" })
            }

            const data = {
                user: {
                    id: userData.id
                }
            }
            const authToken = jwt.sign(data, jwtSecret)
            return resp.send({ msg: "Welcome User", success: true, authToken: authToken })
        } catch (error) {
            resp.send({
                msg: `Error>>> ${error}`,
                success: false
            })
        }
    })
module.exports = router