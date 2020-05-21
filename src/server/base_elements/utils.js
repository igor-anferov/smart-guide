const assert = require('assert').strict;
const sharp = require('sharp');
//const { parse, HtmlGenerator } = require('esm')(module)('latex.js').default;


async function image_checker(req, res, next) {
  const { image } = req.body;
  if (image === undefined)
    return next()

  try {
    const metadata = await sharp(image.buffer).metadata()
    assert(
      ['gif', 'jpeg', 'png', 'svg', 'tiff'].indexOf(metadata.format) > -1,
      'Unsupported image format'
    );
    next()
  } catch (e) {
    e.status = 400
    return next(e)
  }
}

function latex_checker(req, res, next) {
  const { latex } = req.body;
  if (latex === undefined)
    return next()

  try {
//    parse(latex, {generator: new HtmlGenerator()});
    next()
  } catch (e) {
    e.status = 400
    return next(e)
  }
}

module.exports = { image_checker, latex_checker }
