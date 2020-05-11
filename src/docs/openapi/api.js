module.exports = {
  openapi: '3.0.1',
  info: {
    title: 'Умный учебник — API',
    description: 'API для взаимодействия между клиентской и серверной частями приложения',
    version: '0.0.1',
  },
  servers: [
    {
      url: '/api',
      description: 'Development server'
    }
  ],
  paths: {

    '/auth/register': {
      post: require('./paths/auth/register/post.js'),
    },
    '/auth/login': {
      post: require('./paths/auth/login/post.js'),
    },


    '/self' : {
      get: require('./paths/self/get.js'),
      post: require('./paths/self/post.js'),
    },


    '/users/search': {
      post: require('./paths/users/search/post.js'),
    },


    '/groups': {
      get: require('./paths/groups/get.js'),
      post: require('./paths/groups/post.js'),
    },
    '/groups/{group_id}/leave': {
      post: require('./paths/groups/group/leave/post.js'),
    },
    '/groups/{group_id}/members': {
      get: require('./paths/groups/members/get.js'),
      post: require('./paths/groups/members/post.js'),
    },
    '/groups/{group_id}/members/{user_id}': {
      delete: require('./paths/groups/members/delete.js'),
    },


    '/books': {
      get: require('./paths/books/get.js'),
      post: require('./paths/books/post.js'),
    },
    '/books/{book_id}': {
      delete: require('./paths/books/book/delete.js'),
    },
    '/books/{book_id}/info': {
      get: require('./paths/books/book/info/get.js'),
      post: require('./paths/books/book/info/post.js'),
    },
    '/books/{book_id}/content': {
      get: require('./paths/books/book/content/get.js'),
    },


    '/clipboard/base_elements': {
      get: require('./paths/clipboard/base_elements/get.js'),
      post: require('./paths/clipboard/base_elements/post.js'),
    },
    '/clipboard/base_elements/{base_element_id}': {
      delete: require('./paths/clipboard/base_elements/base_element/delete.js'),
    },
    '/clipboard/base_elements/search': {
      post: require('./paths/clipboard/base_elements/search/post.js'),
    },

    '/clipboard/materials': {
      get: require('./paths/clipboard/materials/get.js'),
      post: require('./paths/clipboard/materials/post.js'),
    },
    '/clipboard/materials/{material_id}': {
      delete: require('./paths/clipboard/materials/material/delete.js'),
    },

    '/clipboard/questions': {
      get: require('./paths/clipboard/questions/get.js'),
      post: require('./paths/clipboard/questions/post.js'),
    },
    '/clipboard/questions/{question_id}': {
      delete: require('./paths/clipboard/questions/question/delete.js'),
    },


    '/base_elements/{base_element_id}': {
      post: require('./paths/base_elements/base_element/post.js'),
    },
    '/base_elements/{base_element_id}/info': {
      get: require('./paths/base_elements/base_element/info/get.js'),
    },
    '/base_elements/{base_element_id}/content': {
      get: require('./paths/base_elements/base_element/content/get.js'),
    },
    '/base_elements/{base_element_id}/{material_id}/copy_to_material': {
      post: require('./paths/base_elements/base_element/copy_to_material/post.js'),
    },


    '/materials/search': {
      post: require('./paths/materials/search/post.js'),
    },
    '/materials/{material_id}': {
      get: require('./paths/materials/material/get.js'),
      post: require('./paths/materials/material/post.js'),
    },
    '/materials/{material_id}/base_elements': {
      post: require('./paths/materials/material/base_elements/post.js'),
    },
    '/materials/{material_id}/base_elements/{base_element_id}': {
      delete: require('./paths/materials/material/base_elements/base_element/delete.js'),
    },
    '/materials/{material_id}/base_elements/{base_element_id}/move': {
      post: require('./paths/materials/material/base_elements/base_element/move/post.js'),
    },
    '/materials/{material_id}/base_elements/{base_element_id}/copy_to_clipboard': {
      post: require('./paths/materials/material/base_elements/base_element/copy_to_clipboard/post.js'),
    },
    '/materials/{material_id}/{question_id}/copy_to_question': {
      post: require('./paths/materials/material/copy_to_question/post.js'),
    },
    
    
    '/questions/search': {
      post: require('./paths/questions/search/post.js'),
    },
    '/questions/{question_id}': {
      get: require('./paths/questions/question/get.js'),
      post: require('./paths/questions/question/post.js'),
    },
    '/questions/{question_id}/materials': {
      post: require('./paths/questions/question/materials/post.js'),
    },
    '/questions/{question_id}/materials/{material_id}': {
      delete: require('./paths/questions/question/materials/material/delete.js'),
    },  
    '/questions/{question_id}/materials/{material_id}/move': {
      post: require('./paths/questions/question/materials/material/move/post.js'),
    },
    '/questions/{question_id}/materials/{material_id}/copy_to_clipboard': {
      post: require('./paths/questions/question/materials/material/copy_to_clipboard/post.js'),
    },
    '/questions/{question_id}/{exam_id}/copy_to_exam': {
      post: require('./paths/questions/question/copy_to_exam/post.js'),
    },


    '/exams': {
      get: require('./paths/exams/get.js'),
      post: require('./paths/exams/post.js'),
    },
    '/groups/{group_id}/exams': {
      get: require('./paths/groups/group/exams/get.js'),
    },
    '/groups/{group_id}/exams/{exam_id}': {
      delete: require('./paths/groups/group/exams/exam/delete.js'),
    },
    '/exams/search': {
      post: require('./paths/exams/search/post.js'),
    },
    '/exams/{exam_id}': {
      get: require('./paths/exams/exam/get.js'),
      post: require('./paths/exams/exam/post.js'),
      delete: require('./paths/exams/exam/delete.js'),
    },
    '/exams/{exam_id}/questions': {
      post: require('./paths/exams/exam/questions/post.js'),
    },
    '/exams/{exam_id}/questions/{question_id}': {
      delete: require('./paths/exams/exam/questions/question/delete.js'),
    },  
    '/exams/{exam_id}/questions/{question_id}/move': {
      post: require('./paths/exams/exam/questions/question/move/post.js'),
    },
    '/exams/{exam_id}/questions/{question_id}/copy_to_clipboard': {
      post: require('./paths/exams/exam/questions/question/copy_to_clipboard/post.js'),
    },


  },
  components: {
    securitySchemes: {
      'Аутентификационный токен': {
        type: 'apiKey',
        in: 'cookie',
        name: 'token',
      }
    }
  },
  security: [
    {
      'Аутентификационный токен': []
    }
  ]
}
