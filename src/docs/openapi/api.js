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


    '/clipboard/materials': {
      get: require('./paths/clipboard/materials/get.js'),
      post: require('./paths/clipboard/materials/post.js'),
    },
    '/clipboard/materials/{material_id}': {
      delete: require('./paths/clipboard/materials/material/delete.js'),
    },

    
    '/clipboard/questions': {
      get: require('./paths/clipboard/questions/get.js'),
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
    '/base_elements/{base_element_id}/copy_to_material': {
      post: require('./paths/base_elements/base_element/copy_to_material/post.js'),
    },

    /*'/materials/{material_id}/info': {
      get: require('./paths/materials/material/info/get.js'),
    },
    '/materials/{material_id}/content': {
      get: require('./paths/materials/material/content/get.js'),
    },*/
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


    /*'/questions/{question_id}/info': {
      get: require('./paths/questions/question/info/get.js'),
    },
    '/questions/{question_id}/content': {
      get: require('./paths/questions/question/content/get.js'),
    },
    

    '/exams': {
      get: require('./paths/exams/get.js'),
    },
    
    '/exams/{exam_id}/info': {
      get: require('./paths/exams/exam/info/get.js'),
    },
    '/exams/{exam_id}/content': {
      get: require('./paths/exams/exam/content/get.js'),
    },*/

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
