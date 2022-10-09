const { response } = require('express')
const express = require('express')
const connection = require('../database')
const router = new express.Router()

router.get('/', (req, res) => {
    res.send('Selamat datang di KiosKu')
})

//Get all kegiatan data
router.get('/getAllKegiatan', (req, res) => {
    connection.query('SELECT * FROM kegiatan', (error, rows, fields) => {
        if (error) {
            res.status(500).send(error)
        } else {
            res.status(200).json({ msg: rows.length + " Data retrived", status: 200, data: rows })
        }
    })
})

//Update kegiatan
router.put('/updateKegiatan/:id', (req, res) => {
    const id = req.params.id
    const assignee = req.body.assignee
    const kegiatan_title = req.body.kegiatan_title
    const kegiatan_desc = req.body.kegiatan_desc
    const kegiatan_type = req.body.kegiatan_type
    const kegiatan_url = req.body.kegiatan_url
    const waktu_mulai = req.body.waktu_mulai
    const waktu_selesai = req.body.waktu_selesai
    const updated_at = new Date()

    connection.query("UPDATE " +
        "kegiatan SET assignee = ?, kegiatan_title = ?, kegiatan_desc = ?, kegiatan_type = ?, kegiatan_url = ?, waktu_mulai = ?, waktu_selesai = ?, updated_at = ? " +
        "WHERE id = ? ",
        [assignee, kegiatan_title, kegiatan_desc, kegiatan_type, kegiatan_url, waktu_mulai, waktu_selesai, updated_at, id], (error, rows, fields) => {
        if (error) {
            res.status(400).json({ msg: "Error :" + error })
        } else {
            res.status(200).json({ msg: "Update Success",status:200, data: rows })
        }
    })
})

//Add kegiatan
router.post('/insertKegiatan', (req, res) => {
    const id_kios = req.body.id_kios
    const assignee = req.body.assignee
    const kegiatan_title = req.body.kegiatan_title
    const kegiatan_desc = req.body.kegiatan_desc
    const kegiatan_type = req.body.kegiatan_type
    const kegiatan_url = req.body.kegiatan_url
    const waktu_mulai = req.body.waktu_mulai
    const waktu_selesai = req.body.waktu_selesai
    const created_at = req.body.created_at
    const updated_at = req.body.updated_at

    connection.query("INSERT INTO " +
        "kegiatan (id, id_kios, assignee, kegiatan_title, kegiatan_desc, kegiatan_type, kegiatan_url, waktu_mulai, waktu_selesai, created_at, updated_at) " +
        "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", 
        [null, id_kios, assignee, kegiatan_title, kegiatan_desc, kegiatan_type, kegiatan_url, waktu_mulai, waktu_selesai, created_at, updated_at], (error, rows, fields) => {
        if (error) {
            res.status(400).json({ msg: "Error :" + error })
        } else {
            res.status(200).json({ msg: "Insert Kegiatan Success",status:200, data: rows })
        }
    })
})

//Delete kegiatan
router.delete('/deleteKegiatan/:id', (req, res) => {
    const id = req.params.id
    
    connection.query('DELETE FROM kegiatan WHERE id = ?', [id], (error, rows, fields) => {
        if (error) {
            res.status(500).send(error)
        } else {
            res.status(200).json({ msg: "Deleted Success",status:200, data: rows })
        }
    })
})

module.exports = router