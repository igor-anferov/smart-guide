module.exports = {
  tags: ['Экзамены'],
  summary: 'Получить информацию об экзамене',
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
      description: 'Информация об экзамене',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              'name_exam': {
                type: 'string',
                description: 'Название экзамена',
                example: 'Архитектура ЭВМ и язык Ассемблера',
              },
              'name_teacher': {
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
            required: ['name_exam', 'name_teacher']
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