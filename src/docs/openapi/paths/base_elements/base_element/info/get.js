module.exports = {
  tags: ['Базовые элементы'],
  summary: 'Получить информацию о базовом элементе',
  parameters: [
    {
      name: 'element_id',
      description: 'Идентификатор базового элемента',
      in: 'path',
      schema: { type: 'integer' },
      required: true,
    }
  ],
  responses: {
    '200': {
      description: 'Информация о базовом элементе',
      content: {
        'application/json': {
          schema: {
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
              'type': {
                type: 'string',
                description: 'Тип базового элемента: image или latex',
                enum: ['image', 'latex'],
              },
            },
            required: ['title', 'source', 'type']
          }
        }
      }
    },
    '404': {
      description: 'Базовый элемент не найден',
    },
    '401': require('../../../../responses/401'),
  }
}
