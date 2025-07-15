const express = require('express');
const router = express.Router();
const Person = require('../models/Person');

// 🔐 Untuk keamanan, kita jangan kirim password ke frontend
const hidePassword = (person) => {
  const obj = person.toObject();
  delete obj.password;
  return obj;
};

// POST /api/person → Tambah data orang
router.post('/', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Nama, email, dan password wajib diisi.' });
    }

    // Cek jika email sudah digunakan
    const existing = await Person.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: 'Email sudah terdaftar.' });
    }

    const newPerson = new Person({ name, email, password });
    const savedPerson = await newPerson.save();

    res.status(201).json(hidePassword(savedPerson)); // kirim tanpa password
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET /api/person → Tampilkan semua orang (tanpa password)
router.get('/', async (req, res) => {
  try {
    const people = await Person.find();
    const withoutPasswords = people.map(hidePassword);
    res.json(withoutPasswords);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
