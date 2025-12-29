import genToken from '../config/token.js';
import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'

export const signUp = async (req, res) => {
    try {
        const { userName, email, password } = req.body;
        const checkUserByUserName = await User.findOne({ userName })
        if (checkUserByUserName) {
            return res.status(400).json({ message: "User ALready Exists" })
        }
        const checkUserByEmail = await User.findOne({ email });
        if (checkUserByEmail) {
            return res.status(400).json({ message: "Email ALready Exists" })
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "password must be at least 6 characters" })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = await User.create({
            userName, email, password: hashedPassword
        })

        const token = await genToken(newUser._id)

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: "None",
            secure: false
        })

        return res.status(201).json(newUser)
    } catch (error) {
        return res.status(500).json({ message: `SignUp Error, ${error}` })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "user does not Exists" })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ message: "password Incorrect" })
        }
        const token = await genToken(user._id)

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: "None",
            secure: false
        })

        return res.status(201).json(user)
    } catch (error) {
        return res.status(500).json({ message: `login Error, ${error}` })
    }
}


export const logOut = async (req, res) => {
    try {
        res.clearCookiess("token");
        return res.status(200).json({ message: "log out Suddessfully" })
    } catch (error) {

    }
}