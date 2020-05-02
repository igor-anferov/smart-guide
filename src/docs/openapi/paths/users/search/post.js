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
            type: 'object',
            properties: {
              'user_id': { 
                type: 'integer',
              },
              'login': {
                type: 'string',
              },
              'email': {
                type: 'string',
                format: 'email',
              },
              'university': {
                type: 'string',
              },
              'faculty': {
                type: 'string',
              },
            },
          },
        },
      },
    },
    '401': require('../../../responses/401'),
  }
}
