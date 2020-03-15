module.exports = {
  tags: ['Книги'],
  summary: 'Получить содержимое книги',
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
      description: 'Содержимое PDF-файла с книгой в бинарном виде',
      content: {
        'application/pdf': {
          schema: {
            type: 'string',
            format: 'binary',
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
