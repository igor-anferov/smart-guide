module.exports = {
  tags: ['Экзамены'],
  summary: 'Получить информацию об экзамене',
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
              /*'date_exam': {
                type: 'string',
                format: 'date',
                description: 'дата сдачи',
              },*/
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