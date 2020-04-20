module.exports = {
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
        encoding: {
          'pdf': {
            contentType: 'application/pdf',
          },
        },
      },
    },
  },
  responses: {
    '201': {
      description: 'OK',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              'book_id': { type: 'integer' }
            },
            required: ['book_id'],
          }
        }
      }
    },
    '401': require('../../responses/401'),
  }
}
