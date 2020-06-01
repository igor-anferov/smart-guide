const exam = require('../../../../schemas/exam')
const material = require('../../../../schemas/material')

module.exports = {
  tags: ['Интерактивный режим изучения'],
  summary: 'Отправить результат изучения материала',
  parameters: [
    exam.parameters.exam_id,
    material.parameters.material_id,
  ],
  requestBody: {
    required: true,
    content: {
      'application/x-www-form-urlencoded': {
        schema: {
          type: 'object',
          properties: {
            'successful': {
              type: 'boolean',
            },
          },
        },
      },
    },
  },
  responses: {
    '200': {
      description: 'Результат изучения материала зафиксирован',
    },
    '404': {
      description: 'Учебный материал не найден',
    },
    '401': require('../../../../responses/401'),
  }
}
