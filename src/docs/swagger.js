import React, { useState } from 'react'
import Box from '@material-ui/core/Box';
import SwaggerUI from "swagger-ui-react"
import "swagger-ui-react/swagger-ui.css"
import $RefParser from "json-schema-ref-parser";
import schema from "./openapi/api"

function Api() {
  let mySchema = schema;
  return (
    <Box height={1} style={{ 'overflowX': 'hidden', 'overflowY': 'scroll' }}>
      <SwaggerUI spec={schema} docExpansion={'list'}/>
    </Box>
  );
}

export default Api;
