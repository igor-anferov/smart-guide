module.exports = {
  tags: ['Вопросы'],
  summary: 'Получить иформацию обо всех вопросах пользователя',
  responses: {
    '200': {
      description: 'Список всех вопросов пользователя',
      content: {
        'application/json': {
          schema: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                'id_question': { type: 'integer' },
                'number_version': {type: 'integer'},
                'text_question': {
                  type: 'string',
                  description: 'Формулировка вопроса',
                  example: 'Отыскание точек локального экстремума функции. Достаточные условия экстремума',
                },
              },
              required: ['id_question', 'number_version', 'text_question']
            }
          }
        }
      }
    },
    '401': require('../../responses/401'),
  }
}