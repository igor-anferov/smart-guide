module.exports = {
  tags: ['Учебные элементы'],
  summary: 'Добавить новый базовый элемент в учебный элемент',
  parameters: [
    {
      name: 'material_id',
      description: 'Идентификатор учебного элемента',
      in: 'path',
      schema: { type: 'integer' },
      required: true,
    }
  ],
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
                  minLength: 1,
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
    '201': {
      description: 'Информация о добавленном в учебный элемент базовом элементе',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              'element_id': { type: 'integer' }
            }
          }
        }
      }
    },
    '401': require('../../../../responses/401'),
  }
}