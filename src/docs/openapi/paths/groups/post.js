module.exports = {
  tags: ['Группы'],
  summary: 'Создать новую группу',
  requestBody: {
    required: true,
    content: {
      'application/x-www-form-urlencoded': {
        schema: {
          type: 'object',
          properties: {
            'name': {
              type: 'string',
              description: 'Название группы'
            },
            'users': {
              type: 'array',
              items: {
                type: 'integer',
              },
              description: 'список user_id',
            },
          },
          required: ['name'],
        },
        encoding: {
          'users': {
            style: 'form',
            explode: false,
          },
        },
      },
    },
  },
  responses: {
    '201': {
      description: 'OK',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              'group_id': { type: 'integer' }
            },
            required: ['group_id'],
          }
        }
      }
    },
    '401': require('../../responses/401'),
  }
}
