const exam = require('../../schemas/exam')

module.exports = {
  tags: ['Экзамены'],
  summary: 'Создать новый личный экзамен',
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
	  '401': require('../../responses/401'),
	}
}