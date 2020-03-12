export default {
  tags: ['Буфер обмена'],
  summary: 'Получить информацию о базовых элементах, находящихся в буфере обмена',
  responses: {
    '200': {
      content: {
        'application/json': {
          schema: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                'base_element_id': { type: 'integer' },
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
              required: ['base_element_id', 'title', 'source', 'type']
            }
          }
        }
      }
    },
    '401': require('../../../responses/401').default,
  }
}
