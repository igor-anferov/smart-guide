const exam = require('../../../../schemas/exam')
const group = require('../../../../schemas/group')

module.exports = {
  tags: ['Экзамены'],
  summary: 'Создать новый групповой экзамен',
	parameters: [
	  group.parameters.group_id,
	],
	requestBody: {
	  required: true,
	  content: {
	    'application/x-www-form-urlencoded': {
	      schema: exam.create.request,
	    },
	  },
	},
	responses: {
	  '201': {
	    description: 'Информация о добавленном экзамене',
	    content: {
	      'application/json': {
	        schema: exam.create.response,
	      }
	    }
	  },
	  '401': require('../../../../responses/401'),
	}
}