module.exports = {
  tags: ['Учебные материалы'],
  summary: 'Отредактировать информацию об учебном материале',
  parameters: [
    {
      name: 'material_id',
      description: 'Идентификатор учебного материала',
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
            'title': {
              type: 'string',
              description: 'Новый заголовок учебного материала',
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
	    description: 'Учебный материал успешно обновлён',
	  },
	  '404': {
	    description: 'Учебный материал не найден',
	  },
	  '401': require('../../../responses/401'),
	}
}
