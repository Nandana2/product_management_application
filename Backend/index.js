
// Some Wi-Fi networks have DNS issues resolving MongoDB Atlas SRV records.

const dns = require('dns')

dns.setServers(['8.8.8.8', '8.8.4.4'])



require('dotenv').config()

const express = require('express')
const cors = require('cors')

require('./db/connection')

const router = require('./routes/route')


const app = express()

app.use(cors())

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.use('/uploads', express.static('./uploads'))


app.use(router)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})