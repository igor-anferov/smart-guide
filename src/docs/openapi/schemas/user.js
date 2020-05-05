const { make_path_params, filter } = require('../utils')

const properties = {
  'user_id': {
    type: 'integer',
    description: 'Идентификатор пользователя',
  },
  'name': {
    type: 'string',
    example: 'Пупкин Иван',
  },
  'login': {
    type: 'string',
    example: 'ivan_pupkin',
  },
  'email': {
    type: 'string',
    format: 'email',
    example: 'ivan_pupkin@example.com',
  },
  'university': {
    type: 'string',
    example: 'МГУ им. М. В. Ломоносова',
  },
  'faculty': {
    type: 'string',
    example: 'ВМК',
  },
}

const edit = filter(properties, [
  'name',
  'login',
  'email',
  'university',
  'faculty',
])

const list = filter(properties, [
  'user_id',
  'name',
  'login',
  'email',
  'university',
  'faculty',
])

module.exports = {
  properties,
  parameters: make_path_params(properties),

  edit: {
    type: 'object',
    properties: edit,
    minProperties: 1,
  },

  list: {
    type: 'object',
    properties: list,
    required: [
      'user_id',
      'name',
      'login',
    ],
  },
}
