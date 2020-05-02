module.exports = {
  tags: ['Буфер обмена'],
  summary: 'Поиск по базовым элементам из буфера обмена',
  requestBody: {
    required: true,
    content: {
      'application/x-www-form-urlencoded': {
        schema: {
          type: 'object',
          properties: {
            'text_search': {
              type: 'string',
              description: 'Поисковая стока',
            },
          },
          minProperties: 1,
        },
      },
    },
  },
  responses: {
    '200': {
      description: 'OK',
      content: {
        'application/json': {
          schema: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                'base_element_id': { 
                  type: 'integer',
                },
                'title': {
                  type: 'string',
                },
                'keywords': {
                  type: 'array',
                  items: {
                    type: 'string',
                  },
                },
              },
              required: ['base_element_id', 'title', 'keywords'],
            },
          },
        },
      },
    },
    '401': require('../../../../responses/401'),
  }
}
