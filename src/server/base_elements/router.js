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
    const results_tags = await pool.query('SELECT tag FROM BaseElementTags WHERE base_element_id = $1',
      [base_element_id]
    )
    var tags = []
    var size = results_tags.rows.length
    for(var i = 0; i < size; i++) {
      tags.push(results_tags.rows[i].tag)
    }
    res.status(200).json({
      "title": results.rows[0].title,
      "source": results.rows[0].source,
      "type": results.rows[0].type,
      "is_pivotal": results.rows[0].is_pivotal,
      "tags": tags,
    })
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
  const client = await pool.connect()
  try {
    await client.query('BEGIN')
    try {
      const base_element_id = parseInt(req.params.base_element_id)
      let { tags, image, latex, ...args } = req.body
      const [allowed_types, body] = image ? [['image'], image.buffer] : latex ? [['latex'], Buffer.from(latex)] : [['image', 'latex']];
      if (body)
        args.body = body
      let arg_num = 0;
      if (args.title || args.source || args.is_pivotal || args.body) {
        await client.query(
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
      }
      if (tags) {
        await client.query(
          'DELETE FROM BaseElementTags WHERE base_element_id = $1',
          [base_element_id]
        )
        for (var tag in tags) {
          if (tags.hasOwnProperty(tag)) {
            await client.query('INSERT INTO BaseElementTags (tag, base_element_id) VALUES ($1, $2)',
              [tags[tag], base_element_id]
            )
          }
        }
      }
      await client.query('COMMIT')
      res.status(200).send()
    } catch (e) {
      await client.query('ROLLBACK')
      next(e)
    }
  } finally {
    client.release()
  }
})

router.post('/:base_element_id/:material_id/copy_to_material', async (req, res, next) => {
  const client = await pool.connect()
  try {
    await client.query('BEGIN')
    try {
      var base_element_id = parseInt(req.params.base_element_id)
      const material_id = parseInt(req.params.material_id)
      const position = parseInt(req.body.position)
      const new_base_element = await pool.query(
        'INSERT INTO BaseElements (title, category, type, is_pivotal, body, source, author_id, created, clipboard)\
        SELECT title, category, type, is_pivotal, body, source, $1, CURRENT_TIMESTAMP, $2 FROM BaseElements\
        WHERE base_element_id = $3 AND clipboard = false RETURNING base_element_id',
        [req.user.id, false, base_element_id]
      )
      if (new_base_element.rows.length !== 0) {
        base_element_id = new_base_element.rows[0].base_element_id
      }
      results = await client.query(
        'INSERT INTO MaterialBaseElements (material_id, position, base_element_id)\
        VALUES ($1, $2, $3) RETURNING position',
        [material_id, position, base_element_id]
      )     
      await client.query(
        'UPDATE BaseElements SET clipboard = $1 WHERE base_element_id = $2',
        [false, base_element_id]
      )
      await client.query(
        'UPDATE MaterialBaseElements SET position = position + 1 \
        WHERE material_id = $1 AND position >= $2 AND base_element_id != $3',
        [material_id, parseInt(results.rows[0].position), base_element_id]
      )
      await client.query('COMMIT')
    res.status(200).send()
    } catch (e) {
      await client.query('ROLLBACK')
      next(e)
    }
  } finally {
    client.release()
  }
})

module.exports = router
