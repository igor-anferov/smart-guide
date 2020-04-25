const express = require('express');
const sharp = require('sharp');

let router = express.Router();

const pool = require('../db/pool')

router.get('/:element_id/info', async (req, res, next) => {
  try {
    const element_id = parseInt(req.params.element_id)
    const results = await pool.query(
      'SELECT title, source, type FROM BaseElements WHERE element_id = $1;',
      [element_id]
    )
    res.status(200).send(results.rows[0])
  } catch (e) {
    next(e)
  }
})

router.get('/:element_id/content', async (req, res, next) => {
  try {
    const element_id = parseInt(req.params.element_id)
    const results = await pool.query(
      'SELECT body, type FROM Elements WHERE element_id = $1;',
      [element_id]
    )
    const result = results.rows[0]
    switch (result.type) {
      case 'image':
        res.contentType(`image/${(await sharp(result.body).metadata()).format}`);
        break;
      case 'latex':
        res.contentType("application/x-latex");
        break;
      default:
        throw Error('Unexpected base element type: ' + result.type)
    }
    res.status(200).send(result.body)
  } catch (e) {
    next(e)
  }
})

router.post('/:element_id', async (req, res, next) => {
  try {
    const element_id = parseInt(req.params.element_id)
    const args = req.body
    await pool.query(
      `UPDATE Elements SET ${
        Object.keys(args)
          .map((k, i) => k + ` = $${i + 1}`)
          .join()
      } WHERE id_element = $${Object.entries(args).length + 1}`,
      [...Object.values(args), element_id]
    )
    res.status(200).send()
  } catch (e) {
    next(e)
  }
})

module.exports = router
