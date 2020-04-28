const express = require('express');
const sharp = require('sharp');

const { image_checker, latex_checker } = require('../base_elements/utils')

let router = express.Router();

const pool = require('../db/pool')

router.get('/:base_element_id/info', async (req, res, next) => {
  try {
    const base_element_id = parseInt(req.params.base_element_id)
    const results = await pool.query(
      'SELECT title, source, type, is_pivotal FROM BaseElements WHERE base_element_id = $1;',
      [base_element_id]
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
      'SELECT body, type FROM BaseElements WHERE base_element_id = $1;',
      [base_element_id]
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

router.post('/:base_element_id', image_checker, latex_checker, async (req, res, next) => {
  try {
    const base_element_id = parseInt(req.params.base_element_id)
    let { image, latex, ...args } = req.body
    const [allowed_types, body] = image ? [['image'], image.buffer] : latex ? [['latex'], Buffer.from(latex)] : [['image', 'latex']];
    if (body)
      args.body = body
    let arg_num = 0;
    await pool.query(
      `UPDATE BaseElements SET ${
        Object.keys(args)
          .map((k) => k + ` = $${++arg_num}`)
          .join()
      } WHERE base_element_id = $${++arg_num} AND type IN (${
        allowed_types
          .map(() => `$${++arg_num}`)
          .join()
      })`,
      [...Object.values(args), base_element_id, ...allowed_types]
    )
    res.status(200).send()
  } catch (e) {
    next(e)
  }
})

router.post('/:base_element_id/:material_id/copy_to_material', async (req, res, next) => {
  try {
    const base_element_id = parseInt(req.params.base_element_id)
    const material_id = parseInt(req.params.material_id)
    const position = parseInt(req.body.position)
    const results = await pool.query('INSERT INTO MaterialBaseElements (material_id, position, base_element_id) VALUES ($1, $2, $3) RETURNING position',
      [material_id, position, base_element_id]
    )
    await pool.query('UPDATE MaterialBaseElements SET position = position + 1 WHERE material_id = $1 AND position >= $2 AND base_element_id != $3',
      [material_id, parseInt(results.rows[0].position), base_element_id]
    )
  res.status(200).send()
  } catch (e) {
    next(e)
  }
})

module.exports = router
