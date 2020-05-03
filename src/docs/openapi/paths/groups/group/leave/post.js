const group = require('../../../../schemas/group')


module.exports = {
  tags: ['Группы'],
  summary: 'покинуть группу',
  parameters: [
    group.parameters.group_id,
  ],
  responses: {
    '200': {
      description: 'Вы покинули группу',
    },
    '404': {
      description: 'Группа не найдена',
    },
    '401': require('../../../../responses/401'),
  }
}
