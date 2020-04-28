module.exports = {
  tags: ['Буфер обмена'],
  summary: 'Получить информацию о базовых элементах, находящихся в буфере обмена',
  responses: {
    '200': {
      description: 'Список всех базовых элементов, находящихся в буфере обмена',
      content: {
        'application/json': {
          schema: require('../../../schemas/base_elements.js'),
        }
      }
    },
    '401': require('../../../responses/401'),
  }
}
