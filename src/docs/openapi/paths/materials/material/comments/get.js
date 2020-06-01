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
              oneOf: [
                {
                  type: 'object',
                  properties: {
                    'comment_id': { type: 'integer' },
                    'text': { type: 'string' },
                    'author': user.list,
                    'created_ts': {
                      type: 'string',
                      format: 'date-time',
                    },
                    'edited_ts': {
                      type: 'string',
                      format: 'date-time',
                    },
                  },
                  required: ['comment_id', 'text', 'author', 'created_ts']
                },
                {
                  type: 'object',
                  properties: {
                    'comment_id': { type: 'integer' },
                    'deleted': {
                      type: 'boolean',
                      default: 'true',
                    },
                    'author': user.list,
                    'created_ts': {
                      type: 'string',
                      format: 'date-time',
                    },
                    'edited_ts': {
                      type: 'string',
                      format: 'date-time',
                    },
                    'deleted_ts': {
                      type: 'string',
                      format: 'date-time',
                    },
                  },
                  required: ['comment_id', 'deleted', 'author','created_ts', 'deleted_ts']
                },
              ]
            }
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