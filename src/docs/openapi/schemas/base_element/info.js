module.exports = {
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
    'is_pivotal': {
      type: 'boolean',
      description: 'Включать элемент в теормин',
    },
    'tags': {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          'tag': {
            type: 'string',
          },
        },
      },
    description : 'Теги к базовому элементу',
    },   
  },
  required: ['title', 'source', 'type', 'is_pivotal']
}
