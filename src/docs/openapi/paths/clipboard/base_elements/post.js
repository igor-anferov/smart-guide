module.exports = {
  tags: ['Буфер обмена'],
  summary: 'Добавить новый базовый элемент в буфер обмена',
  requestBody: {
    description: 'Необходимо передать либо параметр "image", либо "latex"',
    required: true,
    content: {
      'multipart/form-data': {
        schema: {
          allOf: [
            {
              type: 'object',
              properties: {
                'title': {
                  type: 'string',
                  description: 'Название базового элемента',
                  example: 'Теорема Лапласа (формулировка, начало)',
                },
                'source': {
                  type: 'string',
                  description: 'Источник',
                  example: 'Ильин, Ким. Линейная алгебра и аналитическая геометрия',
                },
                'image': {
                  type: 'string',
                  format: 'binary',
                  description: 'Изображение',
                },
                'latex': {
                  type: 'string',
                  format: 'binary',
                  description: 'LaTeX',
                },
              },
              required: ['title', 'source'],
            },
            {
              oneOf: [
                {
                  required: ['image'],
                },
                {
                  required: ['latex'],
                },
              ]
            }
          ]
        },
        encoding: {
          'image': {
            contentType: 'image/*',
          },
          'latex': {
            contentType: 'application/x-latex',
          },
        },
      }
    }
  },
  responses: {
    '200': {
      description: 'Информация о добавленном в буфер обмена базовом элементе',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              'base_element_id': { type: 'integer' }
            }
          }
        }
      }
    },
    '401': require('../../../responses/401'),
  }
}
