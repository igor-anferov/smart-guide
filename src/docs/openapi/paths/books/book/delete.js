module.exports = {
  tags: ['Книги'],
  summary: 'Удалить загруженную ранее книгу',
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
      description: 'Книга успешно удалена',
    },
    '404': {
      description: 'Книга не найдена',
    },
    '401': require('../../../responses/401'),
  }
}
