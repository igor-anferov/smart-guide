const question = require('../../../../../schemas/question')
const material = require('../../../../../schemas/material')


module.exports = {
  tags: ['Вопросы'],
  summary: 'Удалить учебный материал из вопроса',
  parameters: [
    material.parameters.material_id,
    question.parameters.question_id,
  ],
  responses: {
    '200': {
      description: 'Учебный материал успешно удалён из вопроса',
    },
    '404': {
      description: 'Вопрос не найден',
    },
    '401': require('../../../../../responses/401'),
  }
}