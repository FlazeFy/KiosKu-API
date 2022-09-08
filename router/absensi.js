const { response } = require('express')
const express = require('express')
const connection = require('../database')
const router = new express.Router()

router.get('/', (req, res) => {
    res.send('Selamat datang di KiosKu')
})

//Get all karyawan data
router.get('/getAllAbsensi', (req, res) => {
    connection.query("SELECT " + 
        "absensi.id, absensi.id_karyawan, karyawan.nama_lengkap_karyawan, karyawan.jabatan_karyawan, " +
        "karyawan.ponsel_karyawan, shift.nama_shift, absensi.status_absen, absensi.deskripsi_absen, " +
        "absensi.waktu_masuk as 'start', absensi.waktu_pulang as 'end' " +
        "FROM absensi " +
        "JOIN karyawan on karyawan.id = absensi.id_karyawan " +
        "JOIN shift on shift.id = absensi.id_shift ", (error, rows, fields) => {
        if (error) {
            res.status(500).send(error)
        } else {
            res.status(200).json({ msg: "Data retrived", status: 200, data: rows })
        }
    })
})

module.exports = router