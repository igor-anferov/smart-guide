module.exports = {
  tags: ['Учебные элементы'],
  summary: 'Отредактировать информацию об учебном элементе',
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
    required: true,
    content: {
      'application/x-www-form-urlencoded': {
        schema: {
          type: 'object',
          properties: {
            'snippet': {
              type: 'string',
              description: 'Новый заголовок учебного элемента',
              example: 'Теорема Лапласа, доказательство, примеры применения',
            },
          },
          minProperties: 1,
        },
      },
    },
  },
	responses: {
	  '200': {
	    description: 'Учебный элемент успешно обновлён',
	  },
	  '404': {
	    description: 'Учебный элемент не найден',
	  },
	  '401': require('../../../responses/401'),
	}
}