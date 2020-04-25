module.exports = {
  tags: ['Базовые элементы'],
  summary: 'Редактировать базовый элемент',
  parameters: [
    {
      name: 'element_id',
      description: 'Идентификатор базового элемента',
      in: 'path',
      schema: { type: 'integer' },
      required: true,
    }
  ],
  requestBody: {
    required: true,
    description: 'Content-Type: multipart/form-data следует использовать только если форматом базового элемента является LaTeX, и LaTeX-код был изменён',
    content: {
      'application/x-www-form-urlencoded': {
        schema: {
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
          },
          minProperties: 1,
        },
      },
      'multipart/form-data': {
        schema: {
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
            'latex': {
              type: 'string',
              minLength: 1,
              description: 'Изменённый LaTeX',
            },
          },
          required: ['latex'],
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
