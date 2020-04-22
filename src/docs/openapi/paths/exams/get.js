module.exports = {
  tags: ['Экзамены'],
  summary: 'Получить информацию об экзаменах пользователя',
  responses: {
    '200': {
      description: 'Список всех экзаменов пользователя',
      content: {
        'application/json': {
          schema: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                'id_exam': { type: 'integer' },
                'number_version': {type: 'integer'},
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
              },
              required: ['id_exam', 'number_version', 'name_exam', 'name_teacher']
            }
          }
        }
      }
    },
    '401': require('../../responses/401'),
  }
}