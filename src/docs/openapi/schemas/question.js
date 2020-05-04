const { make_path_params, filter } = require('../utils')

const properties = {
  'question_id': {
    type: 'integer',
    description: 'Идентификатор учебного материала',
  },
  'text': {
    type: 'string',
    minLength: 1,
    description: 'Формулировка вопроса',
    example: 'Отыскание точек локального экстремума функции. Достаточные условия экстремума',
  },
  'tags': {
    type: 'array',
    items: { type: 'string' },
    description : 'Теги вопроса',
    example: [
      "Математика",
      "Математический анализ",
    ]
  },
  'materials': {
    type: 'array',
    description : 'Материалы, являющиеся ответом на вопрос',
    items: require('./material').list,
  },
}

const get = filter(properties, [
  'text',
  'tags',
  'materials',
])

const create_or_edit_request = filter(properties, [
  'text',
  'tags',
])

const create_response = filter(properties, [
  'question_id',
])

const list = filter(properties, [
  'question_id',
  'text',
])

module.exports = {
  properties,
  parameters: make_path_params(properties),

  get: {
    type: 'object',
    properties: get,
    required: [
      'text',
      'materials',
    ],
  },

  create: {
    request: {
      type: 'object',
      properties: create_or_edit_request,
      required: [
        'text',
      ],
    },
    response: {
      type: 'object',
      properties: create_response,
      required: [
        'question_id',
      ],
    },
  },

  edit: {
    type: 'object',
    properties: create_or_edit_request,
    minProperties: 1,
  },

  list: {
    type: 'object',
    properties: list,
    required: [
      'question_id',
      'text',
    ],
  },
}
