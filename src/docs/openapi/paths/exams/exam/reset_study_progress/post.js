const exam = require('../../../../schemas/exam')

module.exports = {
  tags: ['Интерактивный режим изучения'],
  summary: 'Очистить результаты изучения материалов экзамена',
  parameters: [
    exam.parameters.exam_id,
  ],
  responses: {
    '200': {
      description: 'Pезультаты изучения материалов экзамена очищены',
    },
    '404': {
      description: 'экзамен не найден',
    },
    '401': require('../../../../responses/401'),
  }
}