const material = require('../../../../schemas/material')
const exam = require('../../../../schemas/exam')

module.exports = {
  tags: ['Интерактивный режим изучения'],
  summary: 'Получить случайный учебный элемент для изучения',
  parameters: [
    exam.parameters.exam_id,
  ],
  requestBody: {
    required: true,
    content: {
      'application/x-www-form-urlencoded': {
        schema: {
          type: 'object',
          properties: {
            'success_threshold': {
              type: 'integer',
            },
            'consecutively': {
              type: 'boolean',
            },
          },
          required: ['success_threshold', 'consecutively'],
        },
      },
    },
  },
  responses: {
    '200': {
      description: 'Сведения о случайном учебном элементе из экзамена',
      content: {
        'application/json': {
          schema: material.get,
        }
      }
    },
    '204': {
      description: 'Все учебные материалы изучены'
    },
    '404': {
      description: 'Учебные материалы не найдены',
    },
    '401': require('../../../../responses/401'),
  }
}
