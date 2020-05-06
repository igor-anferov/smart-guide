const { make_path_params, filter } = require('../utils')
//const user = require('./user')

const properties = {
  'group_id': {
    type: 'integer',
    description: 'Идентификатор группы',
  },
  'name': {
    type: 'string',
    minLength: 1,
    description: 'Название группы',
    example: 'СП ВМК МГУ',
  },
  'members': {
    type: 'array',
    description : 'Пользователи, состоящие в группе',
    items: require('./member').list,
  },
}

const edit = filter(properties, [
  'name',
])

const create_request = {
  ...filter(properties, ['name']),
  'user_ids': {
    type: 'array',
    description: 'Пользователи для добавления в группу',
    //items: user.properties.user_id,
    items: {
      type: 'string',
    }
  }
}

const create_response = filter(properties, [
  'group_id',
])

const list = filter(properties, [
  'group_id',
  'name',
])

module.exports = {
  properties,
  parameters: make_path_params(properties),

  edit: {
    type: 'object',
    properties: edit,
    minProperties: 1,
  },

  create: {
    request: {
      type: 'object',
      properties: create_request,
      required: [
        'name',
      ],
    },
    response: {
      type: 'object',
      properties: create_response,
      required: [
        'group_id',
      ],
    },
  },

  list: {
    type: 'object',
    properties: list,
    required: [
      'group_id',
      'name',
    ],
  },
}
