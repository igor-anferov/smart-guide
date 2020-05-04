const base_element = require('../../../../schemas/base_element')


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
            'query': {
              type: 'string',
              description: 'Поисковая стока',
            },
          },
          required: ['query'],
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
                'base_element': base_element.list,
                'matches': {
                  type: 'array',
                  minItems: 1,
                  items: { type: 'string', minLength: 1 },
                  example: ['Лапласа', 'формулировка'],
                },
                'matched_tags': base_element.properties.tags,
              },
              required: ['base_element'/*, 'matches'*/]
            }
          },
        },
      },
    },
    '401': require('../../../../responses/401'),
  }
}
