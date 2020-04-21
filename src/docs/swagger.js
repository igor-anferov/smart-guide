import React from 'react'
import Box from '@material-ui/core/Box';
import SwaggerUI from "swagger-ui-react"
import "swagger-ui-react/swagger-ui.css"

function Api() {
  return (
    <Box height={1} style={{ 'overflowX': 'hidden', 'overflowY': 'scroll' }}>
      <SwaggerUI
        spec={require('./openapi/api')}
        docExpansion={'list'}
        requestInterceptor={(req) => {
          if (req.body) {
            if (req.body instanceof Object) {
              for (let [k,v] of req.body) {
                if (!v) {
                  req.body.delete(k);
                }
              }
            }
            if (req.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
              req.body =
                req.body
                .split('&')
                .filter(e => e.split('=')[1])
                .join('&')
              if (!req.body) {
                delete req.body
              }
            }
          }
          return req;
        }}
      />
    </Box>
  );
}

export default Api;
