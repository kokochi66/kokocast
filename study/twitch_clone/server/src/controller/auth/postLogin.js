import User from '../../models/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const postLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({
            email: email.toLowerCase(),
        })

        if ( user && (await bcrypt.compare(password, user.password))) {
            // 비밀번호가 일치하면 jwt를 발급합니다.
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

            // jwt 토큰을 사용자에게 응답합니다.
            return res.status(200).json({
                userDetails: {
                    email: user.email,
                    token,
                    username: user.username,
                }
            })
        }

        return res.status(400).send('Invalid credentials. Please try again')
    } catch (err) {
        console.log(err)
        return res.status(500).send('Something went wrong. Please try again')
    }
}