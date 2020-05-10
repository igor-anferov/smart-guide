const group = require('../../../../schemas/group')


module.exports = {
  tags: ['Группы'],
  summary: 'покинуть группу',
  parameters: [
    group.parameters.group_id,
  ],
  responses: {
    '200': {
      description: 'Пользователь успешно покинул группу',
    },
    '403': {
      description: 'Пользователь не является участником группы'
    },
    '404': {
      description: 'Группа не найдена',
    },
    '401': require('../../../../responses/401'),
  }
}
