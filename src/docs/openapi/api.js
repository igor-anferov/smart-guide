export default {
  openapi: "3.0.0",
  info: {
    title: "Умный учебник — API",
    description: "API для взаимодействия между клиентской и серверной частями приложения",
    version: "0.0.1",
  },
  servers: [
    {
      url: "http://localhost:3000/api",
      description: "Development server"
    }
  ],
  paths: {

    "/books": {
      get: require("./paths/books/get.js").default,
      post: require("./paths/books/post.js").default,
    },
    "/books/{book_id}": {
      delete: require("./paths/books/book/delete.js").default,
    },
    "/books/{book_id}/info": {
      get: require("./paths/books/book/info/get.js").default,
      post: require("./paths/books/book/info/post.js").default,
    },
    "/books/{book_id}/content": {
      get: require("./paths/books/book/content/get.js").default,
    },


    "/clipboard/base_elements": {
      get: require("./paths/clipboard/base_elements/get.js").default,
      post: require("./paths/clipboard/base_elements/post.js").default,
      delete: require("./paths/clipboard/base_elements/delete.js").default,
    },


    "/base_elements/{base_element_id}": {
      post: require("./paths/base_elements/base_element/post.js").default,
    },
    "/base_elements/{base_element_id}/info": {
      get: require("./paths/base_elements/base_element/info/get.js").default,
    },
    "/base_elements/{base_element_id}/content": {
      get: require("./paths/base_elements/base_element/content/get.js").default,
    },

  },
  components: {
    securitySchemes: {
      basicAuth: {
        type: "http",
        scheme: "basic",
      }
    }
  },
}
