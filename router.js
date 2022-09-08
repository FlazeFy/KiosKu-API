//Leonardho R Sitanggang-1302194041
const { response } = require('express')
const express = require('express')
const connection = require('./database')
const router = new express.Router()

router.get('/', (req, res) => {
    res.send('Selamat datang di KiosKu')
})

//Get all karyawan data
router.get('/getAllKaryawan', (req, res) => {
    connection.query('SELECT * FROM karyawan', (error, rows, fields) => {
        if (error) {
            res.status(500).send(error)
        } else {
            res.status(200).json({ msg: "Data retrived", status: 200, data: rows })
        }
    })
})

module.exports = router