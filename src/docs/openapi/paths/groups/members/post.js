const group = require('../../../schemas/group')
const user = require('../../../schemas/user')


module.exports = {
  tags: ['Группы'],
  summary: 'Добавить пользователей в группу',
  parameters: [
    group.parameters.group_id,
  ],
  requestBody: {
    required: true,
    content: {
      'application/x-www-form-urlencoded': {
        schema: {
          type: 'object',
          properties: {
            'user_ids': {
              type: 'array',
              description: 'Пользователи для добавления в группу',
              //items: user.properties.user_id,
              items: {
                type: 'string',
              }
            }
          },
          required: ['user_ids'],
        },
        encoding: {
          'users': {
            style: 'form',
            explode: false,
          },
        },
      },
    },
  },
  responses: {
    '200': {
      description: 'Пользователи успешно добавлены в группу',
    },
    '404': {
      description: 'Группа не найдена',
    },
    '401': require('../../../responses/401'),
  }
}
