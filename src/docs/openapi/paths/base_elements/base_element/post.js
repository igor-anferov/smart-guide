module.exports = {
  tags: ['Базовые элементы'],
  summary: 'Редактировать базовый элемент',
  parameters: [
    {
      name: 'base_element_id',
      description: 'Идентификатор базового элемента',
      in: 'path',
      schema: { type: 'integer' },
      required: true,
    }
  ],
  requestBody: {
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
                  minLength: 1,
                  description: 'Новое название базового элемента (опционально, только при изменении)',
                  example: 'Теорема Лапласа (формулировка, начало)',
                },
                'source': {
                  type: 'string',
                  minLength: 1,
                  description: 'Новый источник (опционально, только при изменении)',
                  example: 'Ильин, Ким. Линейная алгебра и аналитическая геометрия',
                },
                'is_pivotal': {
                  type: 'boolean',
                  description: 'Включать элемент в теормин (опционально, только при изменении)',
                },
                'image': {
                  type: 'string',
                  format: 'binary',
                  description: 'Новое изображение. Может быть передано только в случае, если тип базового элемента "image"',
                },
                'latex': {
                  type: 'string',
                  minLength: 1,
                  description: 'Изменённый LaTeX. Может быть передано только в случае, если тип базового элемента "latex"',
                },
              },
              minProperties: 1,
            },
            {
              not: {
                allOf: [
                  {
                    required: ['image'],
                  },
                  {
                    required: ['latex'],
                  },
                ]
              }
            }
          ]
        },
      },
    },
  },
  responses: {
    '200': {
      description: 'Базовый элемент успешно обновлён',
    },
    '404': {
      description: 'Базовый элемент не найден',
    },
    '401': require('../../../responses/401'),
  }
}
