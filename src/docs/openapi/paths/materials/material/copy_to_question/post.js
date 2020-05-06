const question = require('../../../../schemas/question')
const material = require('../../../../schemas/material')


module.exports = {
  tags: ['Учебные материалы'],
  summary: 'Скопировать учебный материал в вопрос',
  parameters: [
    question.parameters.question_id,
    material.parameters.material_id,
  ],
  requestBody: {
    required: true,
    content: {
      'application/x-www-form-urlencoded': {
        schema: {
          type: 'object',
          properties: {
            'position': {
              type: 'integer',
              description: 'Позиция учебного материала внутри вопроса',
            },
          },
          required: ['position'],
        },
      },
    },
  },
  responses: {
    '200': {
      description: 'Учебный материал успешно скопирован в вопрос',
    },
    '404': {
      description: 'Вопрос не найден',
    },
    '401': require('../../../../responses/401'),
  }
}
