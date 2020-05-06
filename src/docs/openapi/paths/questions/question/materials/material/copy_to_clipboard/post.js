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
    '200': {
      description: 'Учебный материал успешно скопирован в буфер обмена',
    },
    '404': {
      description: 'Вопрос не найден',
    },
    '401': require('../../../../../../responses/401'),
  }
}
