const express = require('express');
const mysql = require('mysql2/promise');
const joi = require('joi');
const dbConfig = require('../dbConfig');

const router = express.Router();

// GET /categories/
router.get('/', async (req, res) => {
  // gauti visas kategorijas
  try {
    const conn = await mysql.createConnection(dbConfig);
    const [result] = await conn.query('SELECT * FROM book_categories');
    res.send({ msg: 'success', cat: result });
    await conn.end();
  } catch (error) {
    console.log('/categories got error ', error.message);
    res.status(500).send({ error: 'Error getting books' });
  }
});

module.exports = router;
