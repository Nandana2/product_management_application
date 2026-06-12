const users = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
exports.register = async (req, res) => {
  try {

    const { username, email, password } = req.body

    const existingUser = await users.findOne({ email })

    if (existingUser) {
      return res.status(406).json("User already exists")
    }

    const hashPassword = await bcrypt.hash(password, 10)

    const newUser = new users({
      username,
      email,
      password: hashPassword
    })

    await newUser.save()

    res.status(200).json(newUser)

  } catch (err) {
    res.status(500).json(err)
  }
}
exports.login = async (req, res) => {

  try {

    const { email, password } = req.body

    const existingUser = await users.findOne({ email })

    if (!existingUser) {
      return res.status(404).json("User not found")
    }

    const validPassword = await bcrypt.compare(
      password,
      existingUser.password
    )

    if (!validPassword) {
      return res.status(401).json("Invalid credentials")
    }

    const token = jwt.sign(
      {
        userId: existingUser._id
      },
      process.env.SECRET_KEY
    )

    res.status(200).json({
      user: existingUser,
      token
    })

  } catch (err) {
    res.status(500).json(err)
  }
}