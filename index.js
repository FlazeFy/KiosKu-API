const express = require('express')
const cors = require('cors')

//Router
const router_karyawan = require('./router/karyawan')
const router_barang = require('./router/barang')
const router_absensi = require('./router/absensi')

const app = express()
const port = process.env.PORT || 3000

app.use(cors({origin: 'null'}))
app.use(express.json())

app.use(router_karyawan)
app.use(router_barang)
app.use(router_absensi)

app.listen(port, () => {
    console.log('KiosKu API is Running')
})