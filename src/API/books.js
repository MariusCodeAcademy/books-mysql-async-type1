const express = require('express');
const mysql = require('mysql2/promise');
const joi = require('joi');
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
router.post('/add', async (req, res) => {
  // sukurti knyga
  console.log('we got data to create book', req.body);
  // validate with joy
  const newBookSchema = joi.object({
    title: joi.string().min(3).max(50).required(),
    author: joi.string().min(3).max(20).required(),
    year: joi.number().greater(1000).less(2021).required(),
    image: joi.string().min(3).max(100).required(),
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
    const sql = 'INSERT INTO books (title,author,year,image) VALUES(?,?,?,?)';
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

/*
Pats laikas pritaikyti savo žinias praktikoje.

Susikuriame dvi lenteles:

    dealer (id, title, town)
    car (id, dealer_id, make, model, year)

Įrašome bent du dealer, ir kiekvienam dealer bent po tris car (t.y. iš viso bent 6 car).
  
  Fronte pasidarom mygtukus kuriu paspaudimu mes generuojame atitinkamus toliau aprasytus duomenis:

    Atvaizduojame lentelę visų car su jų dealer (car.id, dealer.title, dealer.town, car.make, car.model, car.year).
    Atvaizduojame visus dealer ir kiek jie car turi (t.y. dealer.id, dealer.title, dealer.town, count(by car.dealer_id))
    Atvaizduojame visas dealerio cars kai zinome dealerio id
    Atvaizdujame visa dealerio info kai zinome car id
    