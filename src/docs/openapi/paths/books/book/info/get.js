module.exports = {
  tags: ['Книги'],
  summary: 'Получить информацию о книге',
  parameters: [
    {
      name: 'book_id',
      description: 'Идентификатор книги',
      in: 'path',
      schema: { type: 'integer' },
      required: true,
    }
  ],
  responses: {
    '200': {
      description: 'Информация о книге',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              'title': {
                type: 'string',
                description: 'Название книги',
                example: 'Ильин, Ким. Линейная алгебра и аналитическая геометрия',
              }
            },
            required: ['title']
          }
        }
      }
    },
    '404': {
      description: 'Книга не найдена',
    },
    '401': require('../../../../responses/401'),
  }
}
