module.exports = {
  tags: ['Буфер обмена'],
  summary: 'Получить иформацию о вопросах, находящихся в буфере обмена',
  responses: {
    '200': {
      description: 'Список всех вопросов, находящихся в буфере обмена',
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
              required: ['question_id', 'text']
            }
          }
        }
      }
    },
    '401': require('../../../responses/401'),
  }
}