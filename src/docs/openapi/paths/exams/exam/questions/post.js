const exam = require('../../../../schemas/exam')


module.exports = {
  tags: ['Экзамены'],
  summary: 'Добавить новый вопрос в экзамен',
  parameters: [
    exam.parameters.exam_id,
  ],
  ...require('../../../../requests/create_question.js'),
}