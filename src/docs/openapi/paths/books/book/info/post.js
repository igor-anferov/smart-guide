module.exports = {
  tags: ['Книги'],
  summary: 'Изменить информацию о книге',
  parameters: [
    {
      name: 'book_id',
      description: 'Идентификатор книги',
      in: 'path',
      schema: { type: 'integer' },
      required: true,
    }
  ],
  requestBody: {
    required: true,
    content: {
      'application/x-www-form-urlencoded': {
        schema: {
          type: 'object',
          properties: {
            'title': {
              type: 'string',
              description: 'Новое название книги (опционально, только при изменении)',
              example: 'Ильин, Ким. Линейная алгебра и аналитическая геометрия',
            },
          },
          minProperties: 1,
        },
      },
    },
  },
  responses: {
    '200': {
      description: 'Информация о книге успешно обновлена',
    },
    '404': {
      description: 'Книга не найдена',
    },
    '401': require('../../../../responses/401'),
  }
}
