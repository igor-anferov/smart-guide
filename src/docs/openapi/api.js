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


    '/base_elements/{base_element_id}': {
      post: require('./paths/base_elements/base_element/post.js'),
    },
    '/base_elements/{base_element_id}/info': {
      get: require('./paths/base_elements/base_element/info/get.js'),
    },
    '/base_elements/{base_element_id}/content': {
      get: require('./paths/base_elements/base_element/content/get.js'),
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
