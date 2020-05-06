const exam = require('../../../schemas/exam')
const group = require('../../../schemas/group')

module.exports = {
  tags: ['Экзамены'],
  summary: 'Поиск по всем экзаменам',
  ...require('../../../requests/body_search_query.js'),
  responses: {
    '200': {
      description: 'OK',
      content: {
        'application/json': {
          schema: {
            type: 'array',
            items: {
              oneOf: [
                {
                  type: 'object',
                  properties: {
                    'ехam': exam.list,
                    'matches': {
                      type: 'array',
                      minItems: 1,
                      items: { type: 'string', minLength: 1 },
                      example: ['введение', 'сети'],
                    },
                    'matched_tags': exam.properties.tags,
                  },
                  required: ['exam']
                },
                {
                  type: 'object',
                  properties: {
                    'exam': exam.list,
                    'group': group.list,
                    'matches': {
                      type: 'array',
                      minItems: 1,
                      items: { type: 'string' },
                      example: ['введение', 'сети'],
                    },
                    'matched_tags': exam.properties.tags,
                  },
                  required: ['exam']
                }
              ]
            },
          },
        },
      },
    },
    '401': require('../../../responses/401'),
  }
}
