const question = require('../../../../schemas/question')


module.exports = {
  tags: ['Вопросы'],
  summary: 'Добавить новый учебный материал в вопрос',
  parameters: [
    question.parameters.question_id,
  ],
  ...require('../../../../requests/create_material.js'),
}