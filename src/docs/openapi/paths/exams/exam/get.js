const exam = require('../../../schemas/exam')


module.exports = {
  tags: ['Экзамены'],
  summary: 'Получить все сведения об экзамене',
  parameters: [
    exam.parameters.exam_id,
  ],
  responses: {
    '200': {
      description: 'Сведения об экзамене',
      content: {
        'application/json': {
          schema: exam.get,
        }
      }
    },
    '404': {
      description: 'Экзамен не найден',
    },
    '401': require('../../../responses/401'),
  }
}