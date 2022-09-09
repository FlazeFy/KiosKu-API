const { response } = require('express')
const express = require('express')
const connection = require('../database')
const router = new express.Router()

router.get('/', (req, res) => {
    res.send('Selamat datang di KiosKu')
})

//Get all barang data
router.get('/getAllBarang', (req, res) => {
    connection.query('SELECT * FROM barang', (error, rows, fields) => {
        if (error) {
            res.status(500).send(error)
        } else {
            res.status(200).json({ msg: rows.length + " Data retrived", status: 200, data: rows })
        }
    })
})

//Get barang data by id & nama barang
router.get('/getBarang/:id/:nama_barang', (req, res) => {
    const id = req.params.id
    const nama_barang = req.params.nama_barang
    
    connection.query('SELECT * FROM barang WHERE id like ? or nama_barang like ?', ['%' + id + '%', '%' + nama_barang + '%'], (error, rows, fields) => {
        if (error) {
            res.status(500).send(error)
        } else {
            res.status(200).json({ msg: rows.length + " Data retrived",status:200, data: rows })
        }
    })
})

//Get barang data by kategori barang
router.get('/getBarangKategori/:kategori_barang', (req, res) => {
    const kategori_barang = req.params.kategori_barang
    
    connection.query('SELECT * FROM barang WHERE kategori_barang = ?', [kategori_barang], (error, rows, fields) => {
        if (error) {
            res.status(500).send(error)
        } else {
            res.status(200).json({ msg: rows.length + " " + kategori_barang + " Data retrived",status:200, data: rows })
        }
    })
})

//Add barang
router.post('/insertBarang', (req, res) => {
    const id_kios = req.body.id_kios
    const nama_barang = req.body.nama_barang
    const kategori_barang = req.body.kategori_barang
    const harga_stok = req.body.harga_stok
    const harga_jual = req.body.harga_jual
    const deskripsi_barang = req.body.deskripsi_barang
    const stok_barang = req.body.stok_barang
    const created_at = req.body.created_at
    const updated_at = req.body.updated_at
    const expired_at = req.body.expired_at

    connection.query("INSERT INTO " +
        "barang (id, id_kios, nama_barang, kategori_barang, harga_stok, harga_jual, deskripsi_barang, stok_barang, created_at, updated_at, expired_at) " +
        "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", 
        [null, id_kios, nama_barang, kategori_barang, harga_stok, harga_jual, deskripsi_barang, stok_barang, created_at, updated_at, expired_at], (error, rows, fields) => {
        if (error) {
            res.status(400).json({ msg: "Error :" + error })
        } else {
            res.status(200).json({ msg: "Insert Barang Success",status:200, data: rows })
        }
    })
})

//Update barang
router.put('/updateBarang/:id', (req, res) => {
    const id = req.params.id
    const nama_barang = req.body.nama_barang
    const kategori_barang = req.body.kategori_barang
    const harga_stok = req.body.harga_stok
    const harga_jual = req.body.harga_jual
    const deskripsi_barang = req.body.deskripsi_barang
    const stok_barang = req.body.stok_barang
    const updated_at = new Date()

    connection.query("UPDATE " +
        "barang SET nama_barang = ?, kategori_barang = ?, harga_stok = ?, harga_jual = ?, deskripsi_barang = ?, stok_barang = ?, updated_at = ? " +
        "WHERE id = ? ",
        [nama_barang, kategori_barang, harga_stok, harga_jual, deskripsi_barang, stok_barang, updated_at, id], (error, rows, fields) => {
        if (error) {
            res.status(400).json({ msg: "Error :" + error })
        } else {
            res.status(200).json({ msg: "Update Success",status:200, data: rows })
        }
    })
})

//Delete barang
router.delete('/deleteBarang/:id', (req, res) => {
    const id = req.params.id
    
    connection.query('DELETE FROM barang WHERE id = ?', [id], (error, rows, fields) => {
        if (error) {
            res.status(500).send(error)
        } else {
            res.status(200).json({ msg: "Deleted Success",status:200, data: rows })
        }
    })
})

module.exports = router