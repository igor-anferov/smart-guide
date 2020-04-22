module.exports = {
  tags: ['Вопросы'],
  summary: 'Получить cписок учебных элементов, формирующих ответ на вопрос',
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
      description: 'Список учебных элементов, формирующих ответ на вопрос',
      content: {
        'application/json': {
          schema: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                'id_materials': { type: 'integer' },
                'number_version': {type: 'integer'},
                'snippet': {
                  type: 'string',
                  description: 'Заголовок учебного элемента',
                  example: 'Теорема Лапласа, доказательство, примеры применения',
                },
              },
              required: ['id_materials', 'number_version', 'snippet']
            }
          }
        }
      }
    },
    '401': require('../../../../responses/401'),
  }
}