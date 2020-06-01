const material = require('../../../../../schemas/material')

module.exports = {
  tags: ['Учебные материалы'],
  summary: 'Редактировать комментарий к учебному материалу',
  parameters: [
    material.parameters.material_id,
    {
      name: 'comment_id',
      description: 'Идентификатор комментария',
      in: 'path',
      schema: { type: 'integer' },
      required: true,
    }
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
    '200': {
      description: 'Комментарий успешно отредактирован',
    },
    '404': {
      description: 'Материал или комментарий не найдены',
    },
    '401': require('../../../../../responses/401'),
  }
}