module.exports = {
  type: 'array',
  items: {
    allOf: [
      require('./base_element/id.js'),
      require('./base_element/info.js'),
    ]
  }
}
