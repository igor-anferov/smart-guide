const question = require('../../../../../../schemas/question')
const material = require('../../../../../../schemas/material')


module.exports = {
  tags: ['Вопросы'],
  summary: 'Переместить учебный материал внутри вопроса',
  parameters: [
    material.parameters.material_id,
    question.parameters.question_id,
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
              description: 'Новая позиция учебного материала внутри вопроса',
            },
          },
          required: ['position'],
        },
      },
    },
  },
  responses: {
    '200': {
      description: 'Учебный материал успешно перемещён внутри вопроса',
    },
    '404': {
      description: 'Вопрос не найден',
    },
    '401': require('../../../../../../responses/401'),
  }
}