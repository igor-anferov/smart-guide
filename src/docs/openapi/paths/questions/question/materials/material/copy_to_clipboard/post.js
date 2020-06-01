const question = require('../../../../../../schemas/question')
const material = require('../../../../../../schemas/material')


module.exports = {
  tags: ['Вопросы'],
  summary: 'Скопировать учебный материал из вопроса в буфер обмена',
  parameters: [
    material.parameters.material_id,
     question.parameters.question_id,
  ],
  responses: {
    '201': {
      description: 'Учебный материал успешно скопирован в буфер обмена',
      content: {
        'application/json': {
          schema: material.create.response,
        }
      }
    },
    '404': {
      description: 'Вопрос не найден',
    },
    '401': require('../../../../../../responses/401'),
  }
}
