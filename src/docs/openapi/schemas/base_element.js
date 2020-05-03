const { make_path_params, filter } = require('../utils')

const properties = {
  'base_element_id': {
    description: 'Идентификатор базового элемента',
    type: 'integer',
  },
  'title': {
    type: 'string',
    minLength: 1,
    description: 'Название базового элемента',
    example: 'Теорема Лапласа (формулировка, начало)',
  },
  'source': {
    type: 'string',
    minLength: 1,
    description: 'Источник',
    example: 'Ильин, Ким. Линейная алгебра и аналитическая геометрия',
  },
  'tags': {
    type: 'array',
    items: { type: 'string' },
    description : 'Теги базового элемента',
    example: [
      "Математика",
      "Линейная алгебра",
    ]
  },
  'is_pivotal': {
    type: 'boolean',
    description: 'Включать элемент в теормин',
  },
  'type': {
    type: 'string',
    description: 'Тип базового элемента: image или latex',
    enum: ['image', 'latex'],
  },
  'image': {
    type: 'string',
    format: 'binary',
    description: 'Содержимое базового элемента с типом "image"',
  },
  'latex': {
    type: 'string',
    minLength: 1,
    description: 'Содержимое базового элемента с типом "latex"',
  },
}

const get = filter(properties, [
  'title',
  'source',
  'tags',
  'is_pivotal',
  'type',
])

const create_or_edit_request = filter(properties, [
  'title',
  'source',
  'tags',
  'is_pivotal',
  'image',
  'latex',
])

const create_response = filter(properties, [
  'base_element_id',
])

const list = filter(properties, [
  'base_element_id',
  'title',
  'source',
  'type',
])

module.exports = {
  properties,
  parameters: make_path_params(properties),

  get: {
    type: 'object',
    properties: get,
    required: [
      'title',
      'source',
      'is_pivotal',
      'type',
    ],
  },

  create: {
    request: {
      allOf: [
        {
          type: 'object',
          properties: create_or_edit_request,
          required: [
            'title',
            'source',
            'is_pivotal',
          ],
        },
        {
          oneOf: [
            {
              required: ['image'],
            },
            {
              required: ['latex'],
            },
          ]
        },
      ]
    },
    response: {
      type: 'object',
      properties: create_response,
      required: [
        'base_element_id',
      ],
    },
  },

  edit: {
    allOf: [
      {
        type: 'object',
        properties: create_or_edit_request,
        minProperties: 1,
      },
      {
        not: {
          allOf: [
            {
              required: ['image'],
            },
            {
              required: ['latex'],
            },
          ]
        }
      }
    ]
  },

  list: {
    type: 'object',
    properties: list,
    required: [
      'base_element_id',
      'title',
      'source',
      'type',
    ],
  },
}
