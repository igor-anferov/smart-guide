const question = require('../../../schemas/question')
const exam = require('../../../schemas/exam')
const group = require('../../../schemas/group')


module.exports = {
  tags: ['Вопросы'],
  summary: 'Поиск по всем вопросам',
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
                    'question': question.list,
                    'matches': {
                      type: 'array',
                      minItems: 1,
                      items: { type: 'string', minLength: 1 },
                      example: ['Лапласа', 'теорема'],
                    },
                    'matched_tags': question.properties.tags,
                  },
                  required: ['question']
                },
                {
                  type: 'object',
                  properties: {
                    'question': question.list,
                    'exam': exam.list,
                    'group': group.list,
                    'matches': {
                      type: 'array',
                      minItems: 1,
                      items: { type: 'string' },
                      example: ['Лапласа', 'теорема'],
                    },
                    'matched_tags': question.properties.tags,
                  },
                  required: ['question', 'exam']
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
