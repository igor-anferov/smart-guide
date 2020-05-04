const { make_path_params, filter } = require('../utils')

const properties = {
  'user': require('./user').list,
  'role': {
    type: 'string',
    enum: ["creator", "member"],
  },
}

const list = filter(properties, [
  'user',
  'role',
])

module.exports = {
  properties,
  parameters: make_path_params(properties),

  list: {
    type: 'object',
    properties: list,
    required: [
      'user',
      'role',
    ],
  },
}
