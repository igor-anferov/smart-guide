export default {
  tags: ['Книги'],
  summary: 'Получить список всех книг пользователя',
  responses: {
    '200': {
      content: {
        'application/json': {
          schema: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                'book_id': { type: 'integer' },
                'title': {
                  type: 'string',
                  example: 'Ильин, Ким. Линейная алгебра и аналитическая геометрия',
                },
              },
              required: ['book_id', 'title']
            }
          }
        }
      }
    },
    '401': require('../../responses/401').default,
  }
}
