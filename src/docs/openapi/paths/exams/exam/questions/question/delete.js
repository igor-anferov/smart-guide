const question = require('../../../../../schemas/question')
const exam = require('../../../../../schemas/exam')

module.exports = {
  tags: ['Экзамены'],
  summary: 'Удалить вопрос из экзамена',
  parameters: [
    exam.parameters.exam_id,
    question.parameters.question_id,
  ],
  responses: {
    '200': {
      description: 'Вопрос успешно удалён из экзамена',
    },
    '404': {
      description: 'Экзамен не найден',
    },
    '401': require('../../../../../responses/401'),
  }
}