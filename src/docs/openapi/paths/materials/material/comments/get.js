const material = require('../../../../schemas/material')
const user = require('../../../../schemas/user')

module.exports = {
  tags: ['Учебные материалы'],
  summary: 'Получить комментарии к учебному материалу',
  parameters: [
    material.parameters.material_id,
  ],
  responses: {
    '200': {
      description: 'Комментарии к учебному материалу',
      content: {
        'application/json': {
          schema: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                'comment_id': { type: 'integer' },
                'author': user.list,
                'created': {
                  type: 'string',
                  format: 'date-time',
                },
              },
              required: ['comment_id', 'author', 'created']
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