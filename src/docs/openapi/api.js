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


    "/clipboard/base_blocks": {
      get: require("./paths/clipboard/base_blocks/get.js").default,
      post: require("./paths/clipboard/base_blocks/post.js").default,
      delete: require("./paths/clipboard/base_blocks/delete.js").default,
    },


    "/base_blocks/{base_block_id}": {
      post: require("./paths/base_blocks/base_block/post.js").default,
    },
    "/base_blocks/{base_block_id}/info": {
      get: require("./paths/base_blocks/base_block/info/get.js").default,
    },
    "/base_blocks/{base_block_id}/content": {
      get: require("./paths/base_blocks/base_block/content/get.js").default,
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
