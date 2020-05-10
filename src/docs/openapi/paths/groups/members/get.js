const group = require('../../../schemas/group')
const member = require('../../../schemas/member')


module.exports = {
  tags: ['Группы'],
  summary: 'Получить список пользователей группы',
  parameters: [
    group.parameters.group_id,
  ],
  responses: {
    '200': {
      description: 'Список пользователей группы',
      content: {
        'application/json': {
          schema: {
            type: 'array',
            items: member.list,
          }
        }
      }
    },
    '401': require('../../../responses/401'),
    '403': {
      description: 'Пользователь не состоит в данной группе'
    },
    '404' : {
      description: 'Группа не найдена'
    },
  }
}
