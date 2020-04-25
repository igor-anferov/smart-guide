module.exports = {
  tags: ['Вопросы'],
  summary: 'Получить информацию о вопросе',
  parameters: [
    {
      name: 'question_id',
      description: 'Идентификатор вопроса',
      in: 'path',
      schema: { type: 'integer' },
      required: true,
    },
  ],
  responses: {
    '200': {
      description: 'Информация о вопросе',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              'text': {
                type: 'string',
                description: 'Название экзамена',
                example: 'Архитектура ЭВМ и язык Ассемблера',
              },
            },
            required: ['text']
          }
        }
      }
    },
    '404': {
      description: 'Вопрос не найден',
    },
    '401': require('../../../../responses/401'),
  }
}