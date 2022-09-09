const { response } = require('express')
const express = require('express')
const connection = require('../database')
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
            res.status(200).json({ msg: rows.length + " Data retrived", status: 200, data: rows })
        }
    })
})

//Get karyawan data by id & nama lengkap karyawan
router.get('/getKaryawan/:id/:nama_lengkap_karyawan', (req, res) => {
    const id = req.params.id
    const nama_lengkap_karyawan = req.params.nama_lengkap_karyawan
    
    connection.query('SELECT * FROM karyawan WHERE id like ? or nama_lengkap_karyawan like ?', ['%' + id + '%', '%' + nama_lengkap_karyawan + '%'], (error, rows, fields) => {
        if (error) {
            res.status(500).send(error)
        } else {
            res.status(200).json({ msg: rows.length + " Data retrived",status:200, data: rows })
        }
    })
})

//Get karyawan data by jabatan karyawan
router.get('/getKaryawanJabatan/:jabatan_karyawan', (req, res) => {
    const jabatan_karyawan = req.params.jabatan_karyawan
    
    connection.query('SELECT * FROM karyawan WHERE jabatan_karyawan = ?', [jabatan_karyawan], (error, rows, fields) => {
        if (error) {
            res.status(500).send(error)
        } else {
            res.status(200).json({ msg: rows.length + " " + jabatan_karyawan + " Data retrived",status:200, data: rows })
        }
    })
})

//Add karyawan
router.post('/insertKaryawan', (req, res) => {
    const id_kios = req.body.id_kios
    const nama_karyawan = req.body.nama_karyawan
    const nama_lengkap_karyawan = req.body.nama_lengkap_karyawan
    const email_karyawan = req.body.email_karyawan
    const ponsel_karyawan = req.body.ponsel_karyawan
    const jabatan_karyawan = req.body.jabatan_karyawan
    const status_karyawan = req.body.status_karyawan
    const gaji_karyawan = req.body.gaji_karyawan
    const karyawan_image_url = req.body.karyawan_image_url
    const created_at = req.body.created_at
    const updated_at = req.body.updated_at

    connection.query("INSERT INTO " +
        "karyawan (id, id_kios, nama_karyawan, nama_lengkap_karyawan, email_karyawan, ponsel_karyawan, jabatan_karyawan, status_karyawan, gaji_karyawan, karyawan_image_url, created_at, updated_at) " +
        "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", 
        [null, id_kios, nama_karyawan, nama_lengkap_karyawan, email_karyawan, ponsel_karyawan, jabatan_karyawan, status_karyawan, gaji_karyawan, karyawan_image_url, created_at, updated_at], (error, rows, fields) => {
        if (error) {
            res.status(400).json({ msg: "Error :" + error })
        } else {
            res.status(200).json({ msg: "Insert Karyawan Success",status:200, data: rows })
        }
    })
})

//Update karyawan
router.put('/updateKaryawan/:id', (req, res) => {
    const id = req.params.id
    const nama_karyawan = req.body.nama_karyawan
    const nama_lengkap_karyawan = req.body.nama_lengkap_karyawan
    const email_karyawan = req.body.email_karyawan
    const ponsel_karyawan = req.body.ponsel_karyawan
    const jabatan_karyawan = req.body.jabatan_karyawan
    const status_karyawan = req.body.status_karyawan
    const gaji_karyawan = req.body.gaji_karyawan
    const karyawan_image_url = req.body.karyawan_image_url
    const updated_at = new Date()

    connection.query("UPDATE " +
        "karyawan SET nama_karyawan = ?, nama_lengkap_karyawan = ?, email_karyawan = ?, ponsel_karyawan = ?, jabatan_karyawan = ?, status_karyawan = ?, gaji_karyawan = ?, karyawan_image_url = ?, updated_at = ? " +
        "WHERE id = ? ",
        [nama_karyawan, nama_lengkap_karyawan, email_karyawan, ponsel_karyawan, jabatan_karyawan, status_karyawan, gaji_karyawan, karyawan_image_url, updated_at, id], (error, rows, fields) => {
        if (error) {
            res.status(400).json({ msg: "Error :" + error })
        } else {
            res.status(200).json({ msg: "Update Success",status:200, data: rows })
        }
    })
})

//Delete karyawan
router.delete('/deleteKaryawan/:id', (req, res) => {
    const id = req.params.id
    
    connection.query('DELETE FROM karyawan WHERE id = ?', [id], (error, rows, fields) => {
        if (error) {
            res.status(500).send(error)
        } else {
            res.status(200).json({ msg: "Deleted Success",status:200, data: rows })
        }
    })
})

module.exports = router