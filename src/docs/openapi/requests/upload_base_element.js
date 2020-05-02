module.exports = {
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
                'is_pivotal': {
                  type: 'boolean',
                  description: 'Включать элемент в теормин',
                },
                'image': {
                  type: 'string',
                  format: 'binary',
                  description: 'Изображение',
                },
                'latex': {
                  type: 'string',
                  minLength: 1,
                  description: 'LaTeX',
                },
                'tags': {
                  type: 'array',
                  items: {
                    type: 'string',
                  },
                  description : 'Теги к базовому элементу',
                },
              },
              required: ['title', 'source', 'is_pivotal'],
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
          'tags': {
            style: 'form',
            explode: false,
          },
        },
      }
    }
  },
  responses: {
    '201': {
      description: 'Информация о загруженном базовом элементе',
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
    '401': require('../responses/401'),
  }
}
