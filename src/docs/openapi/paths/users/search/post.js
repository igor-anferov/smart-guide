const user = require('../../../schemas/user')


module.exports = {
  tags: ['Пользователи'],
  summary: 'Поиск пользователей по email, login',
  requestBody: {
    required: true,
    content: {
      'application/x-www-form-urlencoded': {
        schema: {
          type: 'object',
          properties: {
            'email': {
              type: 'string',
              description: 'Поиск по email',
            },
            'login': {
              type: 'string',
              description: 'Поиск по login',
            },
          },
          minProperties: 1,
        },
      },
    },
  },
  responses: {
    '200': {
      description: 'OK',
      content: {
        'application/json': {
          schema: {
            type: 'array',
            items: user.list,
          },
        },
      },
    },
    '401': require('../../../responses/401'),
  }
}
