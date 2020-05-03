const material = require('../../../schemas/material')
const question = require('../../../schemas/question')
const exam = require('../../../schemas/exam')
const group = require('../../../schemas/group')


module.exports = {
  tags: ['Учебные материалы'],
  summary: 'Поиск по всем учебным материалам',
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
            'own_exams': {
              type: 'boolean',
              description: 'Искать в своих экзаменах',
              default: false,
            },
            'groups_exams': {
              type: 'boolean',
              description: 'Искать в экзаменах групп, в которых состоит пользователь',
              default: false,
            },
            'global': {
              type: 'boolean',
              description: 'Искать по экзаменам всех пользователей и групп',
              default: false,
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
              oneOf: [
                {
                  type: 'object',
                  properties: {
                    'material': material.list,
                    'matches': {
                      type: 'array',
                      minItems: 1,
                      items: { type: 'string' },
                      example: ['Лапласа', 'формулировка'],
                    },
                    'matched_tags': material.properties.tags,
                  },
                  required: ['material', 'matches']
                },
                {
                  type: 'object',
                  properties: {
                    'material': material.list,
                    'question': question.list,
                    'exam': exam.list,
                    'group': group.list,
                    'matches': {
                      type: 'array',
                      minItems: 1,
                      items: { type: 'string' },
                      example: ['Лапласа', 'формулировка'],
                    },
                    'matched_tags': material.properties.tags,
                  },
                  required: ['material', 'question', 'exam', 'matches']
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
