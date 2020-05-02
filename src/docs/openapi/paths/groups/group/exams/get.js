module.exports = {
  tags: ['Экзамены'],
  summary: 'Получить список экзаменов группы',
  parameters: [
    {
      name: 'group_id',
      description: 'Идентификатор группы',
      in: 'path',
      schema: { type: 'integer' },
      required: true,
    }
  ],
  responses: {
    '200': {
      description: 'Список всех экзаменов группы',
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
    '401': require('../../../../responses/401'),
  }
}
