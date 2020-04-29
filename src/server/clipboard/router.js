const assert = require('assert').strict;
const express = require('express');

const { image_checker, latex_checker } = require('../base_elements/utils')

let router = express.Router();

const pool = require('../db/pool')

router.get('/base_elements', async (req, res, next) => {
  try {
    const results = await pool.query(
      'SELECT base_element_id, title, source, type, is_pivotal FROM BaseElements WHERE author_id = $1 and clipboard = $2;',
      [req.user.id, true]
    )
    res.status(200).send(results.rows)
  } catch (e) {
    next(e)
  }
})

router.delete('/base_elements/:base_element_id', async (req, res, next) => {
  try {
    const base_element_id = parseInt(req.params.base_element_id)
    await pool.query(
      'DELETE FROM BaseElements WHERE base_element_id = $1;',
      [base_element_id]
    )
    res.status(200).send()
  } catch (e) {
    next(e)
  }
})

router.post('/base_elements', image_checker, latex_checker, async (req, res, next) => {
  try {
    const {image, latex, source, title, is_pivotal} = req.body;
    assert(Boolean(image) !== Boolean(latex))
    const [type, body] = image ? ['image', image.buffer] : ['latex', Buffer.from(latex)];
    const results = await pool.query(
      'INSERT INTO BaseElements (title, author_id, body, source, type, is_pivotal, clipboard, created) VALUES ($1, $2, $3, $4, $5, $6, $7, CURRENT_TIMESTAMP) RETURNING base_element_id',
      [title, req.user.id, body, source, type, is_pivotal, true]
    )
    res.status(201).json({
      "base_element_id": results.rows[0].base_element_id
    })
  } catch (e) {
    next(e)
  }
})

router.get('/materials', async (req, res, next) => {
  try {
    const results = await pool.query(
      'SELECT material_id, title FROM Materials WHERE author_id = $1 and clipboard = $2;',
      [req.user.id, true]
    )
    res.status(200).send(results.rows)
  } catch (e) {
    next(e)
  }
})

router.delete('/materials/:material_id', async (req, res, next) => {
  try {
    const material_id = parseInt(req.params.material_id)
    await pool.query(
      'DELETE FROM Materials WHERE material_id = $1 AND author_id = $2 and clipboard= $3;',
      [material_id, req.user.id, true]
    )
    res.status(200).send()
  } catch (e) {
    next(e)
  }
})

router.post('/materials', async (req, res, next) => {
  try {
    const title = req.body.title
    const results = await pool.query(
      'INSERT INTO Materials (title, author_id, clipboard, created) VALUES ($1, $2, $3, CURRENT_TIMESTAMP) RETURNING material_id',
      [title, req.user.id, true]
    )
    res.status(201).json({
      "material_id": results.rows[0].material_id
    })
  } catch (e) {
    next(e)
  }
})

module.exports = router

