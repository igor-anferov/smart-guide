import React, { useState } from 'react'
import Box from '@material-ui/core/Box';
import SwaggerUI from "swagger-ui-react"
import "swagger-ui-react/swagger-ui.css"
import $RefParser from "json-schema-ref-parser";

function Api() {
  return (
    <Box height={1} style={{ 'overflowX': 'hidden', 'overflowY': 'scroll' }}>
      <SwaggerUI spec={require('./openapi/api')} docExpansion={'list'}/>
    </Box>
  );
}

export default Api;
