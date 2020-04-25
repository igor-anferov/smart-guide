module.exports = {
  tags: ['Учебные элементы'],
  summary: 'Получить информацию об учебном элементе',
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
      description: 'Информация об экзамене',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              'title': {
                type: 'string',
                description: 'Название экзамена',
                example: 'Архитектура ЭВМ и язык Ассемблера',
              },
              'teacher': {
                type: 'string',
                description: 'Преподаватель',
                example: 'Столяров Андрей Викторович',
              },
            },
            required: ['title', 'teacher']
          }
        }
      }
    },
    '404': {
      description: 'Экзамен не найден',
    },
    '401': require('../../../../responses/401'),
  }
}