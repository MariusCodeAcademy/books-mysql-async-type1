const express = require('express');
const mysql = require('mysql2/promise');
const dbConfig = require('../dbConfig');

const router = express.Router();

router.get('/', async (req, res) => {
  // gauti visas knygas
  try {
    const conn = await mysql.createConnection(dbConfig);
    const [result] = await conn.query('SELECT * FROM books');
    res.send({ msg: 'got books', result });
    await conn.end();
  } catch (error) {
    console.log('/ got error ', error.message);
    res.status(500).send({ error: 'Error getting books' });
  }
});
router.post('/add', (req, res) => {
  // sukurti knyga
});
router.delete('/:id', (req, res) => {
  // istrinti knyga knyga
});

module.exports = router;
