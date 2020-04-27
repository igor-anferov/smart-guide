module.exports = {
  tags: ['Вопросы'],
  summary: 'Получить cписок учебных элементов, формирующих ответ на вопрос',
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
      description: 'Список учебных элементов, формирующих ответ на вопрос',
      content: {
        'application/json': {
          schema: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                'material_id': { type: 'integer' },
                'snippet': {
                  type: 'string',
                  description: 'Заголовок учебного элемента',
                  example: 'Теорема Лапласа, доказательство, примеры применения',
                },
              },
              required: ['material_id', 'snippet']
            }
          }
        }
      }
    },
    '401': require('../../../../responses/401'),
  }
}