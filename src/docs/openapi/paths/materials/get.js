module.exports = {
  tags: ['Учебные элементы'],
  summary: 'Получить информацию обо всех учебных элементах',
  responses: {
    '200': {
      description: 'Список всех учебных элементов пользователя',
      content: {
        'application/json': {
          schema: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                'id_material': { type: 'integer' },
                'number_version': {type: 'integer'},
                'snippet': {
                  type: 'string',
                  description: 'Заголовок учебного элемента',
                  example: 'Теорема Лапласа, доказательство, примеры применения',
                },
              },
              required: ['id_material', 'number_version', 'snippet']
            }
          }
        }
      }
    },
    '401': require('../../responses/401'),
  }
}