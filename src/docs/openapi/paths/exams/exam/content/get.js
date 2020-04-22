module.exports = {
  tags: ['Экзамены'],
  summary: 'Получить cписок вопросов к экзамену',
  parameters: [
    {
      name: 'id_exam',
      description: 'Идентификатор экзамена',
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
      description: 'Список всех вопросов к экзамену',
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
    '401': require('../../../../responses/401'),
  }
}