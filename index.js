const express = require('express')
const router = require('./router')
const cors = require('cors')

const app = express()
const port = process.env.PORT || 3000

app.use(cors({origin: 'null'}))
app.use(express.json())
app.use(router)

app.listen(port, () => {
    console.log('KiosKu API is Running')
})