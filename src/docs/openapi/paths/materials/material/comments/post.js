const material = require('../../../../schemas/material')

module.exports = {
  tags: ['Учебные материалы'],
  summary: 'Добавить комментарий к учебному материалу',
  parameters: [
    material.parameters.material_id,
  ],
  requestBody: {
    required: true,
    content: {
      'application/x-www-form-urlencoded': {
        schema: {
          type: 'object',
          properties: {
            'text': {
              type: 'string',
            },
          },
          required: ['text'],
        },
      },
    },
  },
  responses: {
    '201': {
      description: 'Комментарий успешно добавлен',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              'comment_id': {
                type: 'integer',
              },
            },
          },
        },
      },
    },
    '404': {
      description: 'Материал не найден',
    },
    '401': require('../../../../responses/401'),
  }
}