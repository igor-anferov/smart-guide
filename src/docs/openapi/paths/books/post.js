export default {
  tags: ['Книги'],
  summary: 'Загрузить новую книгу на сервер',
  requestBody: {
    required: true,
    content: {
      'multipart/form-data': {
        schema: {
          type: 'object',
          properties: {
            'title': {
              type: 'string',
              description: 'Название книги (опционально, в случае отсутствия используется имя файла)'
            },
            'pdf': {
              type: 'string',
              description: 'PDF-файл с книгой',
              format: 'binary',
            },
          },
          required: ['pdf'],
        },
      },
    },
  },
  responses: {
    '200': {
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              'book_id': { type: 'integer' }
            }
          }
        }
      }
    },
    '401': require('../../responses/401').default,
  }
}
