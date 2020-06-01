const exam = require('../../../schemas/exam')

module.exports = {
  tags: ['Экзамены'],
  summary: 'Удалить личный экзамен',
  parameters: [
    exam.parameters.exam_id,
  ],
  responses: {
    '200': {
      description: 'Экзамен успешно удалён',
    },
    '404': {
      description: 'Экзамен не найден',
    },
    '401': require('../../../responses/401'),
  }
}
