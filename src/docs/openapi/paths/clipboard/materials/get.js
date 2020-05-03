const material = require('../../../schemas/material')


module.exports = {
  tags: ['Буфер обмена'],
  summary: 'Получить информацию об учебных материалах, находящихся в буфере обмена',
  responses: {
    '200': {
      description: 'Список всех учебных элементов, находящихся в буфере обмена',
      content: {
        'application/json': {
          schema: {
            type: 'array',
            items: material.list,
          }
        }
      }
    },
    '401': require('../../../responses/401'),
  }
}
