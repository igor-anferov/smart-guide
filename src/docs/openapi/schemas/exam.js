const { make_path_params, filter } = require('../utils')

const properties = {
  'exam_id': {
    type: 'integer',
    description: 'Идентификатор учебного материала',
  },
  'title': {
    type: 'string',
    minLength: 1,
    description: 'Название экзамена',
    example: 'Архитектура ЭВМ и язык Ассемблера',
  },
  'professor': {
    type: 'string',
    minLength: 1,
    description: 'Преподаватель',
    example: 'Столяров Андрей Викторович',
  },
  'tags': {
    type: 'array',
    items: { type: 'string' },
    description : 'Теги экзамена',
    example: [
      "ЭВМ",
      "Ассемблер",
    ]
  },
  'questions': {
    type: 'array',
    description : 'Вопросы экзамена',
    items: require('./question').list,
  },
}

const get = filter(properties, [
  'title',
  'professor',
  'tags',
  'questions',
])

const create_or_edit_request = filter(properties, [
  'title',
  'professor',
  'tags',
])

const create_response = filter(properties, [
  'exam_id',
])

const list = filter(properties, [
  'exam_id',
  'title',
  'professor',
])

module.exports = {
  properties,
  parameters: make_path_params(properties),

  get: {
    type: 'object',
    properties: get,
    required: [
      'title',
      'professor',
      'questions',
    ],
  },

  create: {
    request: {
      type: 'object',
      properties: create_or_edit_request,
      required: [
        'title',
        'professor',
      ],
    },
    response: {
      type: 'object',
      properties: create_response,
      required: [
        'exam_id',
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
      'exam_id',
      'title',
      'professor',
    ],
  },
}
