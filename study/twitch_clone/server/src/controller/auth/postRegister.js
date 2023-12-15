import User from "../../models/User.js"
import Channel from "../../models/Channel.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const postRegister = async (req, res) => {
    // User 객체를 가져와서 데이터를 세팅해주고, DB에 데이터를 넣어준다.
    try {

        const { username, email, password } = req.body;
        
        // 이미 해당 email의 사용자가 있는지를 검증한다.
        const userExists = await User.exists({ email })
        if (userExists) {
            return res.status(409).send('E-mail already in use')
        }

        // 비밀번호를 암호화한다. - bcrypt를 사용
        const encryptedPassword = await bcrypt.hash(password, 10)

        const newChannel = await Channel.create({})

        const user = await User.create({
            username: username,
            email: email.toLowerCase(),
            password: encryptedPassword,
            channel: newChannel._id,
        })

        // JWT 토큰을 만든다.
        const token = jwt.sign(
            {
                userId: user._id,
                email: user.email,
            },
            process.env.TOKEN_KEY,
            {
                expiresIn: "8h"
            }
        )

        // JWT 토큰과 user 데이터를 반환한다.
        return res.status(201).json({
            userDetails: {
                email : user.email,
                username: user.username,
                token,
            }
        })
    } catch (err) {
        console.log(err)
        return res.status(500).send('Error occured. Please try again')
    }
    return res.send("user has been added to database")
}