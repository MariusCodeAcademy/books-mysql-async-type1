const express = require('express');
const mysql = require('mysql2/promise');
const joi = require('joi');
const dbConfig = require('../dbConfig');

const router = express.Router();

router.get('/', async (req, res) => {
  // gauti visas knygas
  try {
    const conn = await mysql.createConnection(dbConfig);
    const sql = `
    SELECT b.id, b.title, b.author, b.timeStamp, b.year, b.image, c.cat_name
    FROM \`books\` AS b
    LEFT JOIN \`book_categories\` AS c
    ON b.category = c.id
    ORDER BY b.timeStamp`;
    const [result] = await conn.query(sql);
    res.send({ msg: 'got books', result });
    await conn.end();
  } catch (error) {
    console.log('/ got error ', error.message);
    res.status(500).send({ error: 'Error getting books' });
  }
});

router.post('/add', async (req, res) => {
  // sukurti knyga
  console.log('we got data to create book', req.body);
  // validate with joy
  const newBookSchema = joi.object({
    title: joi.string().min(3).max(50).required(),
    author: joi.string().min(3).max(20).required(),
    year: joi.number().greater(1000).less(2021).required(),
    image: joi.string().min(3).max(100).required(),
    category: joi.number().positive(),
  });

  let formValid = false;
  try {
    const validationResult = await newBookSchema.validateAsync(req.body, {
      abortEarly: false,
    });
    // res.send({ msg: 'inputs valid', validationResult });
    formValid = true;
  } catch (err) {
    formValid = false;
    console.log('err', err);
    res.status(400).send({
      error: 'please check inputs',
      err: err.details,
    });
  }

  if (!formValid) return;
  console.log('does it show after errror');

  try {
    const conn = await mysql.createConnection(dbConfig);
    const sql =
      'INSERT INTO books (title,author,year,image,category) VALUES(?,?,?,?,?)';
    const [result] = await conn.execute(sql, Object.values(req.body));
    res.send({ msg: 'book added' });
    await conn.end();
  } catch (error) {
    res.status(500).send({ error: 'Something went wrong' });
  }
  // res.send({ msg: 'Trying to add a book' });
});
router.delete('/:id', (req, res) => {
  // istrinti knyga knyga
});

module.exports = router;
