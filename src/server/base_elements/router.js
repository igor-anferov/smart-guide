const express = require('express');
const sharp = require('sharp');

let router = express.Router();

const pool = require('../db/pool')

router.get('/:base_element_id/info', async (req, res, next) => {
  try {
    const base_element_id = parseInt(req.params.base_element_id)
    const results = await pool.query(
<<<<<<< HEAD
      'SELECT title, source, type, is_pivotal FROM BaseElements WHERE element_id = $1;',
      [element_id]
=======
      'SELECT title, source, type FROM BaseElements WHERE base_element_id = $1;',
      [base_element_id]
>>>>>>> eeedaeca1050fc8b3a4efa09e70149ac598fd953
    )
    res.status(200).send(results.rows[0])
  } catch (e) {
    next(e)
  }
})

router.get('/:base_element_id/content', async (req, res, next) => {
  try {
    const base_element_id = parseInt(req.params.base_element_id)
    const results = await pool.query(
<<<<<<< HEAD
      'SELECT body, type FROM BaseElements WHERE element_id = $1;',
      [element_id]
=======
      'SELECT body, type FROM Elements WHERE base_element_id = $1;',
      [base_element_id]
>>>>>>> eeedaeca1050fc8b3a4efa09e70149ac598fd953
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

router.post('/:base_element_id', async (req, res, next) => {
  try {
    const base_element_id = parseInt(req.params.base_element_id)
    const args = req.body
    await pool.query(
      `UPDATE BaseElements SET ${
        Object.keys(args)
          .map((k, i) => k + ` = $${i + 1}`)
          .join()
<<<<<<< HEAD
      } WHERE element_id = $${Object.entries(args).length + 1}`,
      [...Object.values(args), element_id]
=======
      } WHERE id_element = $${Object.entries(args).length + 1}`,
      [...Object.values(args), base_element_id]
>>>>>>> eeedaeca1050fc8b3a4efa09e70149ac598fd953
    )
    res.status(200).send()
  } catch (e) {
    next(e)
  }
})

module.exports = router
