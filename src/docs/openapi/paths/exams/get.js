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
                'exam_id': { type: 'integer' },
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
              required: ['exam_id', 'title', 'teacher']
            }
          }
        }
      }
    },
    '401': require('../../responses/401'),
  }
}
