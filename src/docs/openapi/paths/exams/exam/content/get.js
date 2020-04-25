module.exports = {
  tags: ['Экзамены'],
  summary: 'Получить cписок вопросов к экзамену',
  parameters: [
    {
      name: 'exam_id',
      description: 'Идентификатор экзамена',
      in: 'path',
      schema: { type: 'integer' },
      required: true,
    },
  ],
  responses: {
    '200': {
      description: 'Список всех вопросов к экзамену',
      content: {
        'application/json': {
          schema: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                'question_id': { type: 'integer' },
                'text': {
                  type: 'string',
                  description: 'Формулировка вопроса',
                  example: 'Отыскание точек локального экстремума функции. Достаточные условия экстремума',
                },
              },
              required: ['question_id','text']
            }
          }
        }
      }
    },
    '401': require('../../../../responses/401'),
  }
}