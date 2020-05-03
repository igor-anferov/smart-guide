const { make_path_params, filter } = require('../utils')

const properties = {
  'material_id': {
    type: 'integer',
    description: 'Идентификатор учебного материала',
  },
  'title': {
    type: 'string',
    minLength: 1,
    description: 'Заголовок учебного материала',
    example: 'Теорема Лапласа, доказательство, примеры применения',
  },
  'tags': {
    type: 'array',
    items: { type: 'string' },
    description : 'Теги учебного материала',
    example: [
      "Математика",
      "Линейная алгебра",
    ]
  },
  'base_elements': {
    type: 'array',
    description : 'Базовые элементы, из которых состоит материал',
    items: require('./base_element').list,
  },
}

const get = filter(properties, [
  'title',
  'tags',
  'base_elements',
])

const create_or_edit_request = filter(properties, [
  'title',
  'tags',
])

const create_response = filter(properties, [
  'material_id',
])

const list = filter(properties, [
  'material_id',
  'title',
])

module.exports = {
  properties,
  parameters: make_path_params(properties),

  get: {
    type: 'object',
    properties: get,
    required: [
      'title',
      'base_elements',
    ],
  },

  create: {
    request: {
      type: 'object',
      properties: create_or_edit_request,
      required: [
        'title',
      ],
    },
    response: {
      type: 'object',
      properties: create_response,
      required: [
        'material_id',
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
      'material_id',
      'title',
    ],
  },
}
