const group = require('../../../schemas/group')
const user = require('../../../schemas/user')


module.exports = {
  tags: ['Группы'],
  summary: 'Удалить пользователя из группы',
  parameters: [
    group.parameters.group_id,
    user.parameters.user_id,
  ],
  responses: {
    '200': {
      description: 'Пользователь успешно удалён из группы',
    },
    '403': {
      description: 'Пользователь не является создателем данной группы'
    },
    '404': {
      description: 'Группа или пользователь не найдена',
    },
    '401': require('../../../responses/401'),
  }
}
