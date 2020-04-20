const assert = require('assert').strict;
const express = require('express');
const sharp = require('sharp');
const {parse, HtmlGenerator} = require('esm')(module)('latex.js').default;

let router = express.Router();

const pool = require('../db/pool')

router.get('/base_elements', async (req, res, next) => {
  try {
    const results = await pool.query(
      'SELECT id_element as base_element_id, title, source, type FROM Elements WHERE id_author = $1 and clipboard = $2;',
      [req.user.id, true]
    )
    res.status(200).send(results.rows)
  } catch (e) {
    next(e)
  }
})

router.delete('/base_elements/:base_element_id', async (req, res, next) => {
  try {
    const id_element = parseInt(req.params.base_element_id)
    await pool.query(
      'DELETE FROM Elements WHERE id_element = $1;',
      [id_element]
    )
    res.status(200).send()
  } catch (e) {
    next(e)
  }
})

router.post('/base_elements', async (req, res, next) => {
  try {
    const {image, latex, source, title} = req.body;
    try {
      assert(image || latex);
      if (image) {
        metadata = await sharp(image.buffer).metadata()
        assert(
          ['gif', 'jpeg', 'png', 'svg', 'tiff'].indexOf(metadata.format) > -1,
          'Unsupported image format'
        );
      }
      if (latex) {
        parse(latex, {generator: new HtmlGenerator()});
      }
    } catch (e) {
      e.status = 400
      return next(e)
    }
    const [type, body] = image ? ['image', image.buffer] : ['latex', Buffer.from(latex)];
    const results = await pool.query(
      'INSERT INTO Elements (title, id_author, body, source, type, clipboard) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id_element',
      [title, req.user.id, body, source, type, true]
    )
    res.status(201).json({
      "base_element_id": results.rows[0].id_element
    })
  } catch (e) {
    next(e)
  }
})

module.exports = router
