module.exports = {
  tags: ['Вопросы'],
  summary: 'Получить информацию о вопросе',
  parameters: [
    {
      name: 'id_question',
      description: 'Идентификатор вопроса',
      in: 'path',
      schema: { type: 'integer' },
      required: true,
    },
    {
      name: 'number_version',
      description: 'Номер версии',
      in: 'path',
      schema: { type: 'integer' },
      required: true,
    }
  ],
  responses: {
    '200': {
      description: 'Информация о вопросе',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              'text_question': {
                type: 'string',
                description: 'Название экзамена',
                example: 'Архитектура ЭВМ и язык Ассемблера',
              },
              'date_added': {
                type: 'string',
                format: 'date',
                description: 'дата создания',
              },
            },
            required: ['text_question', 'date_added']
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